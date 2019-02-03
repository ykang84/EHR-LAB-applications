pipeline{
    agent any

    stages{
        stage('Deploy'){
            steps{
                script{
                  docker.withRegistry('https://build.hdap.gatech.edu'){
                    def app8 = docker.build("interoperability-in-healthcare-it-app8:2.0", "-f ./EHR_app/Dockerfile ./EHR_app")
                    app8.push("latest")


                    def lab8 = docker.build("interoperability-in-healthcare-it-lab8:2.0", "-f ./Lab_app/Dockerfile ./Lab_app")
                    lab8.push("latest")

                    def server8 = docker.build("interoperability-in-healthcare-it-server8:2.0", "-f ./server/Dockerfile ./server")
                    server8.push("latest")

                  }
                }
            }
        }
        //Define stage to notify rancher
        stage('Notify') {
            steps {
                script {
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/interoperability-in-healthcare-it-server8:latest', ports: '', service: 'interoperability/server8', timeout: 200

                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/interoperability-in-healthcare-it-app8:latest', ports: '', service: 'interoperability/app8', timeout: 200

                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'https://rancher.hdap.gatech.edu/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/interoperability-in-healthcare-it-lab8:latest', ports: '', service: 'interoperability/lab8', timeout: 200
                }
            }
        }
    }
}
