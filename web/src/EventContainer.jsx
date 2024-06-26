import React, { useState } from 'react'
import styled from 'styled-components'
import "./style.css"
const NoEventsContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

export function getBackgroundColor(severity) {
  switch (severity) {
    case 'none':
      return '#00b7bf'
    case 'ok':
      return '#00E30F'
    case 'warning':
      return '#ffb744'
    case 'critical':
      return '#ed1f28'
    default:
      return 'lightslategray'
  }
}


function EventRow({event}) {
  const [logsVisible, setLogsVisible] = useState(false)
  const BG = getBackgroundColor(event.severity)

  return (
      <>
        <tr
            onClick={() => setLogsVisible(!logsVisible)}
            style={{ cursor: "pointer", background: BG}}
        >
        <td className='bold' data-label="Cluster">{event.cluster}</td>
        <td data-label="Alertname">{event.alertname}</td>
        <td className='bold' data-label="Namespace">{event.namespace}</td>
        <td data-label="Message">{event.message}</td>
        <td className='bold' data-label="Triggered">{event.triggered}</td>
        </tr>
        {logsVisible ? <tr style={{background: BG, borderTop: 'none'}}>
          {logsVisible &&
          <td colSpan={5}>
            <div className="logRow">
              {event.logs.map(line => (
                  <div>{line}</div>
              ))}
            </div>
          </td>
          }
        </tr> : <div></div>}

      </>
  )
}

function EventContainer({ events }) {
  return events.length === 0 ? (
      <NoEventsContainer>
        <h2>Everything is probably alright</h2>
      </NoEventsContainer>
  ) : (
      <div style={{ overflow: 'auto' }}>
        <table>
          <thead>
            <tr id="eventContainer">
              <th className="cluster">Cluster</th>
              <th>Alertname</th>
              <th className='ns'>Namespace</th>
              <th className='message'>Message</th>
              <th className="triggered">Triggered</th>
            </tr>
          </thead>
          <tbody>
          {events.map(event => (
              <EventRow event={event}/>
          ))}
          </tbody>
        </table>
      </div>


  )
}

export default EventContainer
