const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const resultsContainer = document.getElementById('resultsContainer');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

const today = new Date();
const nextWeek = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));

const formatDate = (date) => date.toISOString().split('T')[0];

startDateInput.value = formatDate(today);
endDateInput.value = formatDate(nextWeek);

startDateInput.addEventListener('change', calculateDifference);
endDateInput.addEventListener('change', calculateDifference);

function calculateDifference() {
    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);

    if (!startDateInput.value || !endDateInput.value) {
        showError("Please select both a start and an end date.");
        return;
    }
    if (start > end) {
        showError("The start date cannot be after the end date.");
        return;
    }

    clearError();

    const timeDifference = end.getTime() - start.getTime();
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    let weekdayCount = 0;
    let weekendCount = 0;

    let currentDate = new Date(start);
    while (currentDate <= end) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) weekendCount++;
        else weekdayCount++;

        currentDate.setDate(currentDate.getDate() + 1);
    }

    const results = {
        totalDays: totalDays,
        totalWeeks: (totalDays / 7).toFixed(2),
        weekdays: weekdayCount,
        weekends: weekendCount,
    };

    updateResults(results);
}

function updateResults(results) {
    document.getElementById('totalDays').textContent = results.totalDays;
    document.getElementById('totalWeeks').textContent = results.totalWeeks;
    document.getElementById('weekdays').textContent = results.weekdays;
    document.getElementById('weekends').textContent = results.weekends;

    resultsContainer.classList.remove('hidden');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
}

function clearError() {
    errorMessage.classList.add('hidden');
    errorText.textContent = '';
}

calculateDifference();
