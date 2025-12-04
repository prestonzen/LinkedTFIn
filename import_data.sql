-- Clear existing data for the user to avoid duplicates
DELETE FROM profiles WHERE user_id = 'prestonzen';
DELETE FROM experiences WHERE user_id = 'prestonzen';
DELETE FROM education WHERE user_id = 'prestonzen';
DELETE FROM skills WHERE user_id = 'prestonzen';
DELETE FROM certifications WHERE user_id = 'prestonzen';
DELETE FROM projects WHERE user_id = 'prestonzen';
DELETE FROM publications WHERE user_id = 'prestonzen';

-- Insert Profile
INSERT INTO profiles (user_id, name, headline, location, about, created_at, updated_at)
VALUES (
    'prestonzen',
    'Preston Zen',
    'Senior Full stack Engineer | Certified AWS Architect | Python | AI | ML | DJANGO | AZURE | GCP | React | Node.js | TypeScript | Go | PHP | OSCE3 | OSCP',
    'San Francisco Bay Area',
    'Software Development leader and AI Full Stack Engineer with experience building solutions in healthcare, finance, defense, and AI. Leads teams to architect scalable platforms and develop AI-driven applications for Fortune 500 companies. Experienced educator at top universities and contributor to global initiatives. Focused on solving complex challenges and turning ideas into impactful, scalable solutions. Let’s connect and create something great!',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Insert Experience
-- Kaizen Apps
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_kaizen',
    'prestonzen',
    'Senior Full Stack Engineer',
    'Kaizen Apps',
    'San Francisco Bay Area',
    '2022-08-01',
    NULL, -- Present
    'As the Senior Lead AI Full Stack Engineer at Kaizen Apps, I lead a dynamic team of 4 (frontend, backend, QA, and DevOps) in the design and development of AI-powered solutions for top-tier U.S. clients. My role involves architecting innovative AI-driven applications in the fields of AI chatbots, web and mobile platforms, and blockchain technologies, with a strong focus on delivering scalable, high-performance systems.

Key projects at Kaizen Apps include:
- EternaBrain: Automated RNA design through move sets and strategies from an Internet-scale RNA videogame
- X-Plane (Flight Sim): Theoretical basis for stabilizing messenger RNA through secondary structure design
- Price Rite (Coupon and Grocery Delivery)
- Znakomstva (European Dating App)
- ArtPro (P2P Art Marketplace)
- HuntPost (Hunting Social Marketplace)
- SpotList (Web Data Aggregator)
- Top Golf Entertainment Group (Backend for Branch Data API Aggregation)

In addition to my work at Kaizen Apps, I also serve as the Lead AI Architect at Symation, where I led a groundbreaking initiative to harness AI Language Model Management Systems (LLMS) for managing private documents across internal companies. At Symation, I was responsible for designing and implementing advanced AI-driven solutions to improve data analysis and management while maintaining the highest standards of confidentiality. I architected and stabilized a SaaS platform using the MERN stack (MongoDB, Express.js, React, Node.js), supporting critical operations between school districts and tutoring companies, scaling from 50,000 users to over 1 million users without compromising on performance. Additionally, I developed a fullstack food ordering platform for local caterers, built with Django and Bootstrap, providing an intuitive user interface for a smooth experience across various devices.

My tech stack includes Python, JavaScript (React, Node.js), C++, Kotlin, Swift, and cloud technologies like AWS, ensuring I can integrate AI seamlessly into the entire software development lifecycle. I am passionate about leveraging LLMs, generative AI, neural networks, and computer vision to build transformative solutions that push the limits of innovation.',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- EXZi
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_exzi',
    'prestonzen',
    'AWS Secure Systems Architect & Full stack engineer',
    'EXZi',
    NULL,
    '2022-08-01',
    '2025-01-01',
    'At Exzi, as an AWS Secure Systems Architect & Full Stack Engineer, I played a crucial role in both the security and architecture of Exzi’s platform. I was responsible for designing and implementing secure, scalable cloud infrastructures within the AWS environment while also leading cybersecurity operations across various aspects of the business.

Key Contributions:
- Cloud Security Architecture: Designed robust security frameworks using AWS VPCs, Security Groups, and NACLs to ensure data integrity, availability, and confidentiality.
- Identity and Access Management (IAM): Implemented least-privilege access controls, multi-factor authentication, and fine-grained policies to restrict unauthorized access.
- Encryption & Data Protection: Leveraged AWS KMS and other encryption tools to ensure end-to-end encryption of sensitive data, both in transit and at rest.
- Monitoring & Incident Response: Set up continuous monitoring with AWS CloudWatch and GuardDuty, enabling rapid detection of threats and efficient incident response.
- Penetration Testing & Vulnerability Assessments: Led AI-driven full-stack penetration testing initiatives, identifying and mitigating vulnerabilities in applications, APIs, and network systems. Conducted source code reviews to identify coding flaws and improve security posture.
- Security Operations: Managed cybersecurity initiatives, including incident response, event monitoring, and managed services, using tools like Elastic and Splunk SIEM, as well as EDR solutions from Comodo and ESET. Provided continuous protection through automated systems and AI-assisted analysis.

My expertise spans vulnerability validation, penetration testing, cloud security, AI, Python, Bash, and AWS security services, enabling me to help organizations design secure, resilient infrastructures capable of withstanding emerging cyber threats.',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- edX
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_edx',
    'prestonzen',
    'AI Fullstack Development & Cyber Systems Architecture Instructor',
    'edX',
    'San Diego, California, United States',
    '2022-08-01',
    '2024-11-01',
    'As an instructor at edX, I specialize in AI Fullstack Development and Cyber Systems Architecture, combining my extensive experience in both cybersecurity and full-stack development to prepare students for real-world challenges. I educate and train future cybersecurity specialists to excel in the cybersecurity industry, teaching across multiple universities in the U.S. and globally.

Key Universities Taught:
2023: University of Birmingham (UK), Lighthouse International School (Thailand)
2022: ASU - Arizona State University, KU - University of Kansas, BUT - Butler University, GWu - George Washington University, UoR - University of Richmond, DU - Denver University, CU - Columbia University, UoW - University of Washington, UoT - University of Toronto (Canada), UoM - University of Minnesota, UCLA - University of Los Angeles, UPENN - University of Pennsylvania, HackerU (UNLV, CSULB, SDSU)
2021-2022: VU - Vanderbilt University, GT - Georgia Institute of Technology, UCR - University of California Riverside, USD - University of California Davis, OSU - Ohio State University, UofU - University of Utah, UNCC - University of North Carolina at Charlotte, SMU - Southern Methodist University, RICEU - Rice University, UCSD - University of California San Diego, Clarusway - Professional IT Accelerator Bootcamp

2019: Technological areas covered: SIEM (Splunk & Kibana/ELK), Forensics (Autopsy), Penetration Testing (Kali Linux), Programming (Python), Traffic Analysis (Wireshark), Patch Management (Ansible)
Distinguished diverse students: Taught Vanderbilt''s 1st Center for Neurodiversity''s students on the spectrum',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Google
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_google',
    'prestonzen',
    'Artificial Intelligence Architect',
    'Google',
    'San Francisco Bay Area',
    '2020-02-01',
    '2022-05-01',
    'In response to the digital shift accelerated by COVID-19, I led a small, specialized team at Google focused on deploying AI chatbot solutions for Fortune 100 companies. Utilizing open-source models like Rasa, Google DialogFlow, and leveraging the Google Cloud Platform, our goal was to streamline operations and elevate customer service during a period of increased online engagement.

Key Contributions:
- Leveraged Rasa and DialogFlow: Developed tailored chatbots for critical applications, including airport ticketing, by blending Rasa''s flexibility with DialogFlow''s advanced NLP, enhancing the customer booking experience.
- Utilized Google Cloud Platform: Engineered scalable support bots to automate high-volume queries for Fortune 100 companies, significantly reducing response times and improving issue resolution rates.
- Enhanced VoIP Systems and Tuned Algorithms: Improved internal communications with AI-driven enhancements in Asterisk-based VoIP systems and refined chatbot algorithms using Google''s ML technologies for better predictive accuracy.
- Enabled Third-Party Integrations: Facilitated integrations with external services and internal systems via Google Cloud APIs, automating processes and improving operational efficiency.

Achievements:
- Reduced query resolution times by up to 50%, boosting customer satisfaction and efficiency.
- Enhanced the accuracy of predictive responses by 30%, establishing new performance benchmarks.
- Pioneered integrations that streamlined workflows, significantly improving departmental operations.

Towards the end of this role, with the release of OpenAI''s GPT-3 API, I integrated LLM technology into existing chatbot user experience flows, further advancing our capabilities and improving the overall user experience.',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Emagined Security
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_emagined',
    'prestonzen',
    'System Design Architect',
    'Emagined Security',
    'San Diego, California, United States',
    '2019-03-01',
    '2020-02-01',
    'As a Systems Design Architect at Emagined Security, I was responsible for designing and optimizing secure, scalable architectures to support security operations across multiple client environments. Working remotely, I leveraged my expertise in cloud-based security infrastructure, threat intelligence aggregation, and AI-driven anomaly detection to enhance cybersecurity resilience.

One of my key projects involved designing and implementing an AWS Data Lake Aggregator for Security Operations Center (SOC) data, consolidating logs and security events from multiple clients into a centralized, scalable repository. This architecture enabled advanced security analytics and facilitated real-time threat detection across diverse environments. I integrated serverless processing with AWS Lambda, automating data ingestion, parsing, and enrichment through a Python FastAPI backend that efficiently processed security telemetry.

Additionally, I developed a Webhook integration via Slack, enabling real-time alerting and facilitating incident response workflows. The system ingested high-fidelity security events, allowing analysts to react swiftly to potential threats. I implemented Regex-based and AI-driven anomaly detection techniques across HIPS (Host-based Intrusion Prevention System) and NIPS (Network-based Intrusion Prevention System) telemetry, identifying patterns indicative of zero-day threats, lateral movement, and advanced persistent threats (APTs).

Beyond architecture design, I actively monitored and contributed to the data outputs of the implemented system, ensuring accuracy and refining detection methodologies based on evolving threat landscapes. I collaborated closely with a team of security engineers and analysts, iterating on system improvements and planning to refactor the backend in Go for enhanced performance and scalability.',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Burwood Group
INSERT INTO experiences (id, user_id, title, company, location, start_date, end_date, description, created_at, updated_at)
VALUES (
    'exp_burwood',
    'prestonzen',
    'Full-Stack Cloud Systems Engineer',
    'Burwood Group',
    'San Diego, California, United States',
    '2016-08-01',
    '2019-03-01',
    'As a Full-Stack Cloud Network Engineer, I specialize in developing and optimizing cloud-based network monitoring solutions, integrating the MERN stack with ServiceNow APIs and custom data collectors for real-time observability and automation. My expertise spans cloud development, network engineering, and automation, ensuring seamless integration between network infrastructure and cloud platforms.

I have managed Palo Alto Firewall policies, configured Cisco routers (EBGP, EIGRP, OSPF), and optimized Cisco switches across global infrastructures. Using ServiceNow, I resolved 80+ tickets per week, ensuring high availability for Fortune 500 companies like Western Digital and SanDisk. Additionally, I integrated SolarWinds for proactive monitoring and managed Citrix Virtual Environment Managers to enhance performance and reliability.

A key achievement was developing a custom React-based UI for network monitoring, backed by a FastAPI Python backend. This system enabled real-time packet filtering (eBerkley), network performance tracking, and automated alerting, streamlining incident response through ServiceNow. I also implemented AWS-based serverless data collectors, automating network anomaly detection and performance analysis.

With a strong background in cloud-native development and network automation, I am committed to building scalable, high-performance solutions that enhance security, efficiency, and observability across enterprise networks.',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Insert Education
-- Columbia University (MMBA)
INSERT INTO education (id, user_id, school, degree, field_of_study, start_date, end_date, description, created_at, updated_at)
VALUES (
    'edu_columbia_mmba',
    'prestonzen',
    'Columbia University',
    'MMBA',
    'Artificial Intelligence & IoT, Business Applications',
    '2019-09-01',
    '2021-05-01',
    NULL,
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Columbia University (Bachelors)
INSERT INTO education (id, user_id, school, degree, field_of_study, start_date, end_date, description, created_at, updated_at)
VALUES (
    'edu_columbia_bs',
    'prestonzen',
    'Columbia University',
    'Bachelors',
    'Computer and Information Sciences, General',
    '2017-04-01',
    '2019-05-01',
    NULL,
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- Insert Skills
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_1', 'prestonzen', 'Application Programming Interfaces (API)', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_2', 'prestonzen', 'PHP', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_3', 'prestonzen', 'MySQL', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_4', 'prestonzen', 'Python', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_5', 'prestonzen', 'AI', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_6', 'prestonzen', 'ML', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_7', 'prestonzen', 'DJANGO', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_8', 'prestonzen', 'AZURE', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_9', 'prestonzen', 'GCP', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_10', 'prestonzen', 'React', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_11', 'prestonzen', 'Node.js', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_12', 'prestonzen', 'TypeScript', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_13', 'prestonzen', 'Go', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_14', 'prestonzen', 'OSCE3', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_15', 'prestonzen', 'OSCP', 0, strftime('%s', 'now') * 1000);
INSERT INTO skills (id, user_id, name, endorsements, created_at) VALUES ('skill_16', 'prestonzen', 'AWS Secure Systems Architect', 0, strftime('%s', 'now') * 1000);

-- Insert Certifications
INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, created_at, updated_at)
VALUES ('cert_1', 'prestonzen', 'OffSec Web Expert (OSWE)', 'OffSec', NULL, NULL, NULL, NULL, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, created_at, updated_at)
VALUES ('cert_2', 'prestonzen', 'OffSec Experienced Penetration Tester (OSEP)', 'OffSec', NULL, NULL, NULL, NULL, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, created_at, updated_at)
VALUES ('cert_3', 'prestonzen', 'OffSec Certified Expert 3 (OSCE3)', 'OffSec', NULL, NULL, NULL, NULL, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, created_at, updated_at)
VALUES ('cert_4', 'prestonzen', 'Sophos Certified Sales Consultant', 'Sophos', NULL, NULL, NULL, NULL, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

INSERT INTO certifications (id, user_id, name, organization, issue_date, expiration_date, credential_id, credential_url, created_at, updated_at)
VALUES ('cert_5', 'prestonzen', 'OffSec Wireless Professional (OSWP)', 'OffSec', NULL, NULL, NULL, NULL, strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);
