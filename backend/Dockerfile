# Use official Python image as a base
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install -r requirements.txt

# Expose port for FastAPI
EXPOSE 7070

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7070", "--reload"]
