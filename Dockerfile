FROM ${base-images}
COPY . ${workdir}
WORKDIR ${workdir}
RUN npm install
CMD ["npm", "run", "start"]
