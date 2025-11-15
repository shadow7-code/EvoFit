const exercises = [
  {
    name: "Push-Ups",
    icon: "💪",
    description: "Classic upper body exercise targeting chest, shoulders, and triceps.",
    reps: { Beginner: 10, Intermediate: 15, Advanced: 20 },
    calories: 20
  },
  {
    name: "Squats",
    icon: "🦵",
    description: "Lower body compound movement for legs and glutes.",
    reps: { Beginner: 15, Intermediate: 20, Advanced: 30 },
    calories: 25
  },
  {
    name: "Burpees",
    icon: "🔥",
    description: "Full body explosive movement for cardio and strength.",
    reps: { Beginner: 5, Intermediate: 10, Advanced: 15 },
    calories: 35
  },
  {
    name: "Plank",
    icon: "🧘",
    description: "Core stabilization exercise. Hold position (seconds shown as reps).",
    reps: { Beginner: 20 , Intermediate: 30, Advanced: 45 },
    calories: 15
  },
  {
    name: "Lunges",
    icon: "🚶",
    description: "Alternating leg exercise for balance and lower body strength.",
    reps: { Beginner: 10, Intermediate: 16, Advanced: 20 },
    calories: 22
  },
  {
    name: "Mountain Climbers",
    icon: "⛰️",
    description: "Dynamic core exercise with cardio benefits.",
    reps: { Beginner: 20, Intermediate: 30, Advanced: 40 },
    calories: 30
  },
  {
    name: "Jumping Jacks",
    icon: "⭐",
    description: "Cardio warm-up exercise for full body activation.",
    reps: { Beginner: 20, Intermediate: 30, Advanced: 50 },
    calories: 18
  },
  {
    name: "Tricep Dips",
    icon: "💯",
    description: "Upper body exercise focusing on triceps and shoulders.",
    reps: { Beginner: 8, Intermediate: 12, Advanced: 20 },
    calories: 16
  },
  {
    name: "High Knees",
    icon: "🏃",
    description: "Cardio exercise that engages core and improves coordination.",
    reps: { Beginner: 20, Intermediate: 30, Advanced: 40 },
    calories: 25
  },
  {
    name: "Side Plank",
    icon: "🎯",
    description: "Core exercise targeting obliques. Hold each side (seconds as reps).",
    reps: { Beginner: 15, Intermediate: 20, Advanced: 30 },
    calories: 12
  },
  {
    name: "Bicycle Crunches",
    icon: "🚴",
    description: "Dynamic ab exercise for core strength and definition.",
    reps: { Beginner: 15, Intermediate: 25, Advanced: 40 },
    calories: 20
  },
  {
    name: "Wall Sit",
    icon: "🪑",
    description: "Isometric leg exercise. Hold position against wall (seconds as reps).",
    reps: { Beginner: 20, Intermediate: 30, Advanced: 45 },
    calories: 18
  }
];

// ==================== APP STATE MANAGEMENT ====================
let appState = {
  user: null,
  workoutActive: false,
  currentWorkout: {
    startTime: null,
    completedExercises: [],
    totalCalories: 0,
    duration: 0
  },
  timerInterval: null
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Check if user data exists
  const userData = getUserData();
  
  if (!userData) {
    // Show modal for first-time users
    showModal();
  } else {
    // Load existing user data
    appState.user = userData;
    updateDashboard();
    hideModal();
  }
  
  // Setup event listeners
  setupEventListeners();
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
  // User form submission
  const userForm = document.getElementById('userForm');
  userForm.addEventListener('submit', handleUserFormSubmit);
  
  // Start workout button
  const startBtn = document.getElementById('startWorkoutBtn');
  startBtn.addEventListener('click', startWorkout);
  
  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetApp);
}

// ==================== MODAL FUNCTIONS ====================
function showModal() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.add('active');
}

function hideModal() {
  const modal = document.getElementById('modalOverlay');
  modal.classList.remove('active');
}

function handleUserFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const userData = {
    weight: parseFloat(formData.get('weight')),
    height: parseInt(formData.get('height')),
    level: formData.get('level'),
    timePerDay: parseInt(formData.get('timePerDay'))
  };
  
  // Save to localStorage
  saveUserData(userData);
  appState.user = userData;
  
  // Initialize workout history if not exists
  if (!getWorkoutHistory()) {
    const initialHistory = {
      totalMinutes: 0,
      totalCalories: 0,
      workoutDays: [],
      workoutSessions: []
    };
    saveWorkoutHistory(initialHistory);
  }
  
  // Update UI
  updateDashboard();
  hideModal();
}

// ==================== LOCAL STORAGE FUNCTIONS ====================
function getUserData() {
  const data = localStorage.getItem('userInfo');
  return data ? JSON.parse(data) : null;
}

function saveUserData(data) {
  localStorage.setItem('userInfo', JSON.stringify(data));
}

function getWorkoutHistory() {
  const data = localStorage.getItem('workoutHistory');
  return data ? JSON.parse(data) : null;
}

function saveWorkoutHistory(data) {
  localStorage.setItem('workoutHistory', JSON.stringify(data));
}

// ==================== DASHBOARD FUNCTIONS ====================
function updateDashboard() {
  if (!appState.user) return;
  
  // Update user details
  document.getElementById('userWeight').textContent = `${appState.user.weight} kg`;
  document.getElementById('userHeight').textContent = `${appState.user.height} cm`;
  document.getElementById('userLevel').textContent = appState.user.level;
  document.getElementById('userTime').textContent = `${appState.user.timePerDay} min`;
  
  // Calculate and display BMI
  const bmi = calculateBMI(appState.user.weight, appState.user.height);
  const bmiElement = document.getElementById('bmiValue');
  const bmiIndicator = document.getElementById('bmiIndicator');
  
  bmiElement.textContent = bmi.toFixed(2);
  
  // Remove all BMI classes
  bmiIndicator.classList.remove('bmi-normal', 'bmi-overweight', 'bmi-underweight');
  
  // Add appropriate BMI class
  if (bmi < 18.5) {
    bmiIndicator.classList.add('bmi-underweight');
    bmiIndicator.innerHTML = `BMI: ${bmi.toFixed(2)} (Underweight)`;
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiIndicator.classList.add('bmi-normal');
    bmiIndicator.innerHTML = `BMI: ${bmi.toFixed(2)} (Normal)`;
  } else {
    bmiIndicator.classList.add('bmi-overweight');
    bmiIndicator.innerHTML = `BMI: ${bmi.toFixed(2)} (Overweight)`;
  }
  
  // Update workout stats
  updateWorkoutStats();
}

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

function updateWorkoutStats() {
  const history = getWorkoutHistory();
  
  if (history) {
    // Update total time
    const totalMinutes = history.totalMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeDisplay = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;
    document.getElementById('totalTime').textContent = timeDisplay;
    
    // Update total calories
    document.getElementById('totalCalories').textContent = `${history.totalCalories} kcal`;
    
    // Update workout count
    document.getElementById('workoutCount').textContent = history.workoutSessions.length;
    
    // Calculate streak
    const streak = calculateStreak(history.workoutDays);
    document.getElementById('currentStreak').textContent = `${streak} days`;
  }
}

function calculateStreak(workoutDays) {
  if (!workoutDays || workoutDays.length === 0) return 0;
  
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  // Sort dates in descending order
  const sortedDays = workoutDays.sort((a, b) => new Date(b) - new Date(a));
  
  // Check if last workout was today or yesterday
  if (sortedDays[0] !== today && sortedDays[0] !== yesterday) {
    return 0;
  }
  
  let streak = 0;
  let currentDate = new Date();
  
  // Count consecutive days
  for (let i = 0; i < sortedDays.length; i++) {
    const workoutDate = new Date(sortedDays[i]);
    const diffDays = Math.floor((currentDate - workoutDate) / 86400000);
    
    if (diffDays <= streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

// ==================== WORKOUT FUNCTIONS ====================
function startWorkout() {
  appState.workoutActive = true;
  appState.currentWorkout = {
    startTime: Date.now(),
    completedExercises: [],
    totalCalories: 0,
    duration: 0
  };
  
  // Hide start button and show workout plan
  document.getElementById('workoutControls').style.display = 'none';
  document.getElementById('workoutPlan').classList.add('active');
  
  // Render exercise cards
  renderExercises();
  
  // Start timer
  startTimer();
}

function renderExercises() {
  const container = document.getElementById('exercisesGrid');
  container.innerHTML = '';
  
  exercises.forEach((exercise, index) => {
    const card = createExerciseCard(exercise, index);
    container.appendChild(card);
  });
}

function createExerciseCard(exercise, index) {
  const userLevel = appState.user.level;
  const reps = exercise.reps[userLevel];
  
  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.id = `exercise-${index}`;
  
  card.innerHTML = `
    <div class="exercise-image">${exercise.icon}</div>
    <div class="exercise-content">
      <div class="exercise-name">${exercise.name}</div>
      <div class="exercise-description">${exercise.description}</div>
      <div class="exercise-stats">
        <div class="exercise-stat">
          <span class="exercise-stat-label">Reps</span>
          <span class="exercise-stat-value">${reps}</span>
        </div>
        <div class="exercise-stat">
          <span class="exercise-stat-label">Calories</span>
          <span class="exercise-stat-value">${exercise.calories}</span>
        </div>
      </div>
      <button class="btn btn-complete" onclick="completeExercise(${index})">
        Done
      </button>
    </div>
  `;
  
  return card;
}

function completeExercise(index) {
  if (appState.currentWorkout.completedExercises.includes(index)) return;
  
  // Mark as completed
  appState.currentWorkout.completedExercises.push(index);
  appState.currentWorkout.totalCalories += exercises[index].calories;
  
  // Update UI
  const card = document.getElementById(`exercise-${index}`);
  card.classList.add('completed');
  card.querySelector('.btn-complete').disabled = true;
  card.querySelector('.btn-complete').textContent = 'Completed ✓';
  
  // Update progress
  updateProgress();
  
  // Check if all exercises completed
  if (appState.currentWorkout.completedExercises.length === exercises.length) {
    completeWorkout();
  }
}

function updateProgress() {
  const completed = appState.currentWorkout.completedExercises.length;
  const total = exercises.length;
  const percentage = (completed / total) * 100;
  
  document.getElementById('progressText').textContent = `${completed}/${total}`;
  document.getElementById('progressFill').style.width = `${percentage}%`;
}

function startTimer() {
  appState.timerInterval = setInterval(() => {
    const elapsed = Date.now() - appState.currentWorkout.startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    document.getElementById('workoutTimer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function completeWorkout() {
  // Stop timer
  clearInterval(appState.timerInterval);
  
  // Calculate duration
  const duration = Math.floor((Date.now() - appState.currentWorkout.startTime) / 60000);
  appState.currentWorkout.duration = duration;
  
  // Update workout history
  const history = getWorkoutHistory() || {
    totalMinutes: 0,
    totalCalories: 0,
    workoutDays: [],
    workoutSessions: []
  };
  
  const today = new Date().toDateString();
  
  // Add today to workout days if not already there
  if (!history.workoutDays.includes(today)) {
    history.workoutDays.push(today);
  }
  
  // Add this session
  history.workoutSessions.push({
    date: today,
    duration: duration,
    calories: appState.currentWorkout.totalCalories,
    timestamp: Date.now()
  });
  
  // Update totals
  history.totalMinutes += duration;
  history.totalCalories += appState.currentWorkout.totalCalories;
  
  // Save to localStorage
  saveWorkoutHistory(history);
  
  // Show completion message
  showCompletionMessage(duration, appState.currentWorkout.totalCalories);
  updateWorkoutStats();
  
  // Reset workout state
  setTimeout(() => {
    resetWorkoutUI();
    updateDashboard();
  }, 3000);
}

function showCompletionMessage(duration, calories) {
  document.getElementById('completionTime').textContent = duration;
  document.getElementById('completionCalories').textContent = calories;
  document.getElementById('completionMessage').classList.add('active');
}

function closeCompletionMessage() {
  document.getElementById('completionMessage').classList.remove('active');
  window.location.href = 'dashboard.html';
}

function resetWorkoutUI() {
  appState.workoutActive = false;
  appState.currentWorkout = {
    startTime: null,
    completedExercises: [],
    totalCalories: 0,
    duration: 0
  };
  
  // Hide workout plan and show start button
  document.getElementById('workoutPlan').classList.remove('active');
  document.getElementById('workoutControls').style.display = 'block';
  
  // Reset progress
  document.getElementById('progressText').textContent = '0/12';
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('workoutTimer').textContent = '00:00';
}

// ==================== RESET FUNCTIONS ====================
function resetApp() {
  if (confirm('Are you sure you want to reset all your data? This action cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
}

// Make functions globally accessible
window.completeExercise = completeExercise;
window.closeCompletionMessage = closeCompletionMessage;