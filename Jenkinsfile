pipeline{
    agent any
    stages {
        stage("Test"){
            agent { docker 'node:18-alpine3.16'}
            steps {
                sh 'npm version'
                sh 'npm install'
                sh 'npx jest'
            }
        }
    }
}
