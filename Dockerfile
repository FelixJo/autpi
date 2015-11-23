# Pull base image
FROM resin/rpi-raspbian:jessie
MAINTAINER MainAero

# Install curl
RUN apt-get update && apt-get install -y curl

# Install node
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -

# Install dependencies
RUN apt-get install -y \
    git-core \
    build-essential \
    gcc \
    nodejs \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install forever
RUN npm install -g forever

# Install wiringPi
RUN git clone https://github.com/WiringPi/WiringPi.git
RUN cd wiringPi && ./build && cd ..

# Install 433.92 raspberry pi
RUN git clone https://github.com/NAzT/433.92-Raspberry-Pi.git
RUN cd 433.92-Raspberry-Pi && make && cp send ../433sen && cp sendElro ../433sendElro && cd ..

# Bundle app source
COPY . /data
RUN cd data && npm install

# Define working directory
WORKDIR /data
VOLUME /data


# Expose port
EXPOSE 3000

# Define default command
CMD ["forever", "/data/bin/www"]