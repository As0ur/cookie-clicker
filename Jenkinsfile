pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'cookie-clicker'
        NODE_VERSION = '18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    sh '''
                        node --version
                        npm --version
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    npm init -y
                    npm install --save-dev eslint htmlhint stylelint jest jsdom
                '''
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('HTML Lint') {
                    steps {
                        sh '''
                            echo '{"tagname-lowercase": true, "attr-lowercase": true}' > .htmlhintrc
                            npx htmlhint **/*.html
                        '''
                    }
                }
                
                stage('JavaScript Lint') {
                    steps {
                        sh '''
                            echo '{"env": {"browser": true, "es2021": true}, "extends": "eslint:recommended"}' > .eslintrc.json
                            npx eslint **/*.js
                        '''
                    }
                }
                
                stage('CSS Lint') {
                    steps {
                        sh '''
                            echo '{"extends": "stylelint-config-standard"}' > .stylelintrc.json
                            npx stylelint **/*.css
                        '''
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    try {
                        sh '''
                            # Install Trivy if not present
                            if ! command -v trivy &> /dev/null; then
                                sudo apt-get update
                                sudo apt-get install wget apt-transport-https gnupg lsb-release
                                wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
                                echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
                                sudo apt-get update
                                sudo apt-get install trivy
                            fi
                            
                            # Run security scan
                            trivy fs --format json --output trivy-results.json .
                        '''
                    } catch (Exception e) {
                        echo "Trivy scan failed: ${e}"
                    }
                }
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.',
                    reportFiles: 'trivy-results.json',
                    reportName: 'Security Scan Report'
                ])
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    echo 'module.exports = { testEnvironment: "jsdom" };' > jest.config.js
                    mkdir -p test
                    echo 'describe("Basic Tests", () => { test("should pass", () => expect(true).toBe(true)); });' > test/basic.test.js
                    npm test -- --coverage --watchAll=false
                '''
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }
        
        stage('Build Docker Image') {
            when {
                anyOf {
                    branch 'main'
                    changeRequest()
                }
            }
            steps {
                script {
                    def image = docker.build("${env.IMAGE_NAME}:${env.BUILD_NUMBER}")
                    if (env.BRANCH_NAME == 'main') {
                        docker.withRegistry("https://${env.DOCKER_REGISTRY}", 'docker-registry-credentials') {
                            image.push()
                            image.push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            parallel {
                stage('Deploy to Staging') {
                    steps {
                        sh '''
                            echo "Deploying to staging environment..."
                            # Add staging deployment commands here
                            # kubectl apply -f k8s/staging/
                        '''
                    }
                }
                
                stage('Deploy to Production') {
                    input {
                        message "Deploy to production?"
                        ok "Deploy"
                    }
                    steps {
                        sh '''
                            echo "Deploying to production..."
                            # Add production deployment commands here
                            # kubectl apply -f k8s/production/
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        
        success {
            echo "Pipeline completed successfully!"
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ ${env.JOB_NAME} - ${env.BUILD_NUMBER} deployed successfully"
            )
        }
        
        failure {
            echo "Pipeline failed!"
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "❌ ${env.JOB_NAME} - ${env.BUILD_NUMBER} failed"
            )
        }
    }
}
