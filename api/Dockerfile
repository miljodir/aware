FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /src

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . /src
CMD ["python", "/src/app.py"]
