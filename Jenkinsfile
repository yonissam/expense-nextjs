pipeline {
environment {
registry = "yoniss/nextjs"
registryCredential = 'dockerhub_id'
dockerImage = ''
}
    agent any
    stages{
        stage('Build docker image'){
            steps{
                script{
                   dockerImage = docker.build registry
                }
            }
        }
        stage('Push image to Hub'){
            steps{
                script{
                   docker.withRegistry( '', registryCredential ) {
                  dockerImage.push()
                }
                }
            }
        }
        stage('Deploy') {
                steps{
                script {
                    sh 'docker run -d --name expense-nextjs -p 3050:3000 yoniss/nextjs'
                }
                }
                }

    }
}