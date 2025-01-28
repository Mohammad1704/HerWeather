document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const logPeriodButton = document.getElementById('logPeriod');
    const cycleLengthDisplay = document.getElementById('cycleLength');
    const predictedPeriodDisplay = document.getElementById('predictedPeriod');
    const periodHistoryList = document.getElementById('periodHistory');

    let periodData = JSON.parse(localStorage.getItem('periodData') || '[]');

    function updateDisplay() {
        if (periodData.length === 0) {
            cycleLengthDisplay.textContent = 'N/A';
            predictedPeriodDisplay.textContent = 'N/A';
            return;
        }

        let totalCycleLength = 0;
        for (let i = 1; i < periodData.length; i++) {
            const prevEndDate = new Date(periodData[i - 1].endDate);
            const currentStartDate = new Date(periodData[i].startDate);
            totalCycleLength += (currentStartDate - prevEndDate) / (1000 * 60 * 60 * 24);
        }

        const averageCycleLength = periodData.length > 1 ? Math.round(totalCycleLength / (periodData.length - 1)) : 'N/A';
        cycleLengthDisplay.textContent = averageCycleLength;

        if (periodData.length > 0 && averageCycleLength !== 'N/A') {
            const lastPeriodEndDate = new Date(periodData[periodData.length - 1].endDate);
            const predictedDate = new Date(lastPeriodEndDate);
            predictedDate.setDate(lastPeriodEndDate.getDate() + averageCycleLength);
            predictedPeriodDisplay.textContent = predictedDate.toLocaleDateString();
        } else {
            predictedPeriodDisplay.textContent = 'N/A';
        }

        periodHistoryList.innerHTML = '';
        periodData.forEach(period => {
            const listItem = document.createElement('li');
            listItem.textContent = `Start: ${new Date(period.startDate).toLocaleDateString()}, End: ${new Date(period.endDate).toLocaleDateString()}`;
            periodHistoryList.appendChild(listItem);
        });
    }

    logPeriodButton.addEventListener('click', function() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        periodData.push({ startDate, endDate });
        localStorage.setItem('periodData', JSON.stringify(periodData));
        updateDisplay();
        startDateInput.value = '';
        endDateInput.value = '';
    });

    updateDisplay();
});
