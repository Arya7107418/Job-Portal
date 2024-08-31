
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const searchBtn = document.getElementById('search-btn');
    const jobSearch = document.getElementById('job-search');
    const jobList = document.getElementById('job-list');
    const contactForm = document.getElementById('contact-form');
    const dropdownBtn = document.getElementById('dropdown-btn');

    // Sample job data (in a real application, this would come from an API)
    const jobs = [
        { title: 'English Teacher', company: 'ABC School', location: 'Tokyo' },
        { title: 'Software Engineer', company: 'Tech Co., Ltd.', location: 'Osaka' },
        { title: 'Marketing Specialist', company: 'Global Corp', location: 'Fukuoka' },
        { title: 'Translator', company: 'Translation Services', location: 'Kyoto' },
        { title: 'Financial Analyst', company: 'Bank of Japan', location: 'Tokyo' }
    ];

    // Language toggle
    langToggle.addEventListener('click', function() {
        this.textContent = this.textContent === '日本語' ? 'English' : '日本語';
    });

    // Dropdown toggle
    dropdownBtn.addEventListener('click', function() {
        jobList.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#dropdown-btn')) {
            if (jobList.classList.contains('show')) {
                jobList.classList.remove('show');
            }
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', searchJobs);
    jobSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchJobs();
        }
    });

    function searchJobs() {
        const searchTerm = jobSearch.value.toLowerCase();
        const filteredJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm)
        );
        displayJobs(filteredJobs);
        jobList.classList.add('show');
    }

    function displayJobs(jobsToDisplay) {
        jobList.innerHTML = '';
        if (jobsToDisplay.length === 0) {
            jobList.innerHTML = '<p class="job-item">No jobs found</p>';
        } else {
            jobsToDisplay.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.classList.add('job-item');
                jobElement.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>${job.company} - ${job.location}</p>
                `;
                jobList.appendChild(jobElement);
            });
        }
    }

    // Initial job display
    displayJobs(jobs);

    // Contact form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // In a real application, this would send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});