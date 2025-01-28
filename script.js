document.addEventListener('DOMContentLoaded', function() {
    const greetingDisplay = document.getElementById('greeting');
    const cycleDayDisplay = document.getElementById('cycleDay');
    const daysUntilPeriodDisplay = document.getElementById('daysUntilPeriod');
    const pregnancyChanceDisplay = document.getElementById('pregnancyChance');
    const ovulationDayDisplay = document.getElementById('ovulationDay');
    const symptomsIconsDisplay = document.getElementById('symptomsIcons');
    const addInfoButton = document.getElementById('addInfoButton');
    const navItems = document.querySelectorAll('.nav-item');

    const userName = 'Martina';
    const now = new Date();
    const currentHour = now.getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good Morning, ' + userName + '!';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon, ' + userName + '!';
    } else {
        greeting = 'Good Evening, ' + userName + '!';
    }

    greetingDisplay.textContent = greeting;

    // Placeholder data for cycle day, days until period, and pregnancy chance
    // In a real app, this would be calculated based on user data
    const currentCycleDay = 18;
    const daysUntilPeriod = 4;
    const pregnancyChance = 'Low pregnancy chance';
    const ovulationDay = 3;
    const symptoms = ['💊', '✨'];

    cycleDayDisplay.textContent = currentCycleDay;
    daysUntilPeriodDisplay.textContent = daysUntilPeriod + ' days';
    pregnancyChanceDisplay.textContent = pregnancyChance;
    ovulationDayDisplay.textContent = ovulationDay;

    symptomsIconsDisplay.innerHTML = '';
    symptoms.forEach(symptom => {
        const symptomSpan = document.createElement('span');
        symptomSpan.classList.add('symptom-icon');
        symptomSpan.textContent = symptom;
        symptomsIconsDisplay.appendChild(symptomSpan);
    });

    addInfoButton.addEventListener('click', function() {
        alert('Navigating to add info screen');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            alert('Navigating to ' + target + ' screen');
        });
    });
});
