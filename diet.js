// Simplified diet plan data - same meals for all weeks
const baseDietPlans = {
  vegetarian: {
    calories: 2000,
    protein: '150g',
    carbs: '220g',
    fat: '60g',
    meals: [
      {
        name: 'Breakfast',
        time: '7:00 AM - 8:00 AM',
        icon: '🌅',
        items: [
          { name: 'Moong dal chilla (Moong lentil pancakes)', portion: '2 chillas' },
          { name: 'Greek yogurt/Low Fat Dahi', portion: '1/2 cup' }
        ],
        macros: { calories: 320, protein: '18g', carbs: '45g', fat: '8g' }
      },
      {
        name: 'Lunch',
        time: '1:00 PM - 2:00 PM',
        icon: '🍽️',
        items: [
          { name: 'Masoor dal (Lentil)', portion: '1 cup' },
          { name: 'Brown rice', portion: '1 cup' },
          { name: 'Stir-fried vegetables', portion: '1 cup' }
        ],
        macros: { calories: 565, protein: '24g', carbs: '82g', fat: '15g' }
      },
      {
        name: 'Snack',
        time: '4:00 PM - 5:00 PM',
        icon: '🥜',
        items: [
          { name: 'Masala roasted Chana (Chickpeas)', portion: '1/2 cup' },
          { name: 'Mixed fruit bowl with chaat masala', portion: '1 cup' }
        ],
        macros: { calories: 250, protein: '11g', carbs: '42g', fat: '5g' }
      },
      {
        name: 'Dinner',
        time: '7:30 PM - 8:30 PM',
        icon: '🌙',
        items: [
          { name: 'Tofu stir-fry with capsicum and broccoli', portion: '1 cup' },
          { name: 'Quinoa', portion: '1 cup' },
          { name: 'Tomato cucumber salad', portion: '1 serving' }
        ],
        macros: { calories: 570, protein: '26g', carbs: '68g', fat: '18g' }
      }
    ]
  },
  'non-vegetarian': {
    calories: 2100,
    protein: '170g',
    carbs: '210g',
    fat: '65g',
    meals: [
      {
        name: 'Breakfast',
        time: '7:00 AM - 8:00 AM',
        icon: '🌅',
        items: [
          { name: 'Omelette', portion: '3 whole eggs + 6 egg whites' },
          { name: 'Whole wheat bread', portion: '3 slices' },
          { name: 'Blueberries', portion: '1 cup' }
        ],
        macros: { calories: 680, protein: '67g', carbs: '65g', fat: '18g' }
      },
      {
        name: 'Lunch',
        time: '1:00 PM - 2:00 PM',
        icon: '🍗',
        items: [
          { name: 'Grilled chicken breast', portion: '150g' },
          { name: 'Cauliflower and cabbage stir fry', portion: '1 cup' },
          { name: 'Makhana (Fox nuts) snack', portion: '1/2 cup' }
        ],
        macros: { calories: 400, protein: '50g', carbs: '40g', fat: '5g' }
      },
      {
        name: 'Snack',
        time: '4:00 PM - 5:00 PM',
        icon: '🥛',
        items: [
          { name: 'Low-fat curd', portion: '1 cup' },
          { name: 'Seasonal fruit', portion: '1 medium' }
        ],
        macros: { calories: 180, protein: '11g', carbs: '35g', fat: '3g' }
      },
      {
        name: 'Dinner',
        time: '7:30 PM - 8:30 PM',
        icon: '🌙',
        items: [
          { name: 'Paneer (cottage cheese) curry', portion: '1 cup' },
          { name: 'Boiled potato', portion: '1 medium' },
          { name: 'Olive oil for cooking', portion: '1 tbsp' }
        ],
        macros: { calories: 520, protein: '22g', carbs: '45g', fat: '15g' }
      }
    ]
  }
};

// User data
let userData = {
  preference: null,
  goal: null,
  age: null,
  gender: null,
  weight: null,
  height: null,
  activity: null,
  bmr: null,
  tdee: null,
  targetCalories: null
};

const activityMultipliers = {
  'sedentary': 1.2,
  'light': 1.375,
  'moderate': 1.55,
  'active': 1.725,
  'very-active': 1.9
};

function getActiveUsername() {
  return window.EvoFitAuth?.getActiveUsername?.() || null;
}

function getStoredProfile() {
  const username = getActiveUsername();
  if (!username) return null;
  return window.EvoFitStorage?.getUserSection?.(username, 'profile') || null;
}

function loadSavedDiet() {
  const username = getActiveUsername();
  if (!username) return null;
  return window.EvoFitStorage?.getUserSection?.(username, 'dietPlan') || null;
}

function persistDietPlan() {
  const username = getActiveUsername();
  if (!username) {
    console.warn('Diet plan persistence skipped because no user is logged in.');
    return;
  }

  // Store userData directly without wrapping
  window.EvoFitStorage?.setUserSection?.(username, 'dietPlan', userData);
}

function bootstrapDietPage() {
  const savedPlan = loadSavedDiet();
  
  // Handle both old format (with userData wrapper) and new format (direct userData)
  const savedUserData = savedPlan?.userData || savedPlan;
  
  if (savedUserData && savedUserData.preference && savedUserData.goal) {
    userData = savedUserData;

    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById('dietSelector').style.display = 'flex';
    document.getElementById('nutritionSummary').style.display = 'block';
    document.getElementById('tipsSection').style.display = 'block';

    const goalBadge = document.getElementById('goalBadge');
    const goalText = document.getElementById('goalText');
    goalBadge.style.display = 'inline-block';
    goalBadge.className = `goal-badge ${userData.goal}`;

    if (userData.goal === 'weight-loss') {
      goalText.textContent = `📉 Weight Loss Plan - ${Math.round(userData.targetCalories)} cal/day`;
    } else if (userData.goal === 'muscle-gain') {
      goalText.textContent = `💪 Muscle Gain Plan - ${Math.round(userData.targetCalories)} cal/day`;
    } else {
      goalText.textContent = `⚖️ Maintenance Plan - ${Math.round(userData.targetCalories)} cal/day`;
    }

    document.querySelectorAll('[data-diet]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-diet') === userData.preference);
    });

    loadDietPlan();
    return;
  }

  const storedUserInfo = getStoredProfile();
  if (storedUserInfo?.weight && storedUserInfo?.height) {
    document.getElementById('weight').value = storedUserInfo.weight;
    document.getElementById('height').value = storedUserInfo.height;
    userData.weight = parseFloat(storedUserInfo.weight);
    userData.height = parseFloat(storedUserInfo.height);
  }
}

window.addEventListener('DOMContentLoaded', bootstrapDietPage);

// Step 1: Dietary preference
document.querySelectorAll('.preference-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preference-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userData.preference = btn.getAttribute('data-preference');
    
    setTimeout(() => {
      document.getElementById('step1').style.display = 'none';
      document.getElementById('step2').style.display = 'block';
    }, 300);
  });
});

// Step 2: Goal selection
document.querySelectorAll('.goal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    userData.goal = btn.getAttribute('data-goal');
    
    setTimeout(() => {
      document.getElementById('step2').style.display = 'none';
      document.getElementById('step3').style.display = 'block';
    }, 300);
  });
});

// Calculate BMR using Mifflin-St Jeor Equation
function calculateBMR(weight, height, age, gender) {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
}

// Update calculations on input
document.querySelectorAll('#age, #gender, #weight, #height, #activity').forEach(input => {
  input.addEventListener('change', updateCalculations);
});

function updateCalculations() {
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const activity = document.getElementById('activity').value;

  if (age && gender && weight && height && activity) {
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = bmr * activityMultipliers[activity];
    
    let targetCalories;
    if (userData.goal === 'weight-loss') {
      targetCalories = tdee - 500;
    } else if (userData.goal === 'muscle-gain') {
      targetCalories = tdee + 300;
    } else {
      targetCalories = tdee;
    }

    document.getElementById('bmrValue').textContent = Math.round(bmr);
    document.getElementById('tdeeValue').textContent = Math.round(tdee);
    document.getElementById('targetCalories').textContent = Math.round(targetCalories);
    document.getElementById('calculatedInfo').style.display = 'block';

    userData.bmr = bmr;
    userData.tdee = tdee;
    userData.targetCalories = targetCalories;
  }
}

// Form submission
document.getElementById('bodyDetailsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  userData.age = parseInt(document.getElementById('age').value);
  userData.gender = document.getElementById('gender').value;
  userData.weight = parseFloat(document.getElementById('weight').value);
  userData.height = parseFloat(document.getElementById('height').value);
  userData.activity = document.getElementById('activity').value;

  persistDietPlan();

  document.getElementById('modalOverlay').classList.add('hidden');
  document.getElementById('dietSelector').style.display = 'flex';
  document.getElementById('nutritionSummary').style.display = 'block';
  document.getElementById('tipsSection').style.display = 'block';
  
  const goalBadge = document.getElementById('goalBadge');
  const goalText = document.getElementById('goalText');
  goalBadge.style.display = 'inline-block';
  goalBadge.className = `goal-badge ${userData.goal}`;
  
  if (userData.goal === 'weight-loss') {
    goalText.textContent = `📉 Weight Loss Plan - ${Math.round(userData.targetCalories)} cal/day`;
  } else if (userData.goal === 'muscle-gain') {
    goalText.textContent = `💪 Muscle Gain Plan - ${Math.round(userData.targetCalories)} cal/day`;
  } else {
    goalText.textContent = `⚖️ Maintenance Plan - ${Math.round(userData.targetCalories)} cal/day`;
  }

  loadDietPlan();
});

// Diet type selection (Veg/Non-Veg switcher)
document.querySelectorAll('[data-diet]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-diet]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    userData.preference = btn.getAttribute('data-diet');
    
    persistDietPlan();
    
    loadDietPlan();
  });
});

// Load and adjust diet plan based on user's target calories
function loadDietPlan() {
  const basePlan = baseDietPlans[userData.preference];
  if (!basePlan || !userData.targetCalories) {
    return;
  }
  
  const scalingFactor = userData.targetCalories / basePlan.calories;
  
  const adjustedProtein = Math.round(parseFloat(basePlan.protein) * scalingFactor);
  const adjustedCarbs = Math.round(parseFloat(basePlan.carbs) * scalingFactor);
  const adjustedFat = Math.round(parseFloat(basePlan.fat) * scalingFactor);

  document.getElementById('totalCalories').textContent = Math.round(userData.targetCalories);
  document.getElementById('totalProtein').textContent = adjustedProtein + 'g';
  document.getElementById('totalCarbs').textContent = adjustedCarbs + 'g';
  document.getElementById('totalFat').textContent = adjustedFat + 'g';

  const mealsContainer = document.getElementById('mealsContainer');
  mealsContainer.innerHTML = '';

  basePlan.meals.forEach(meal => {
    const adjustedCalories = Math.round(meal.macros.calories * scalingFactor);
    const adjustedMealProtein = Math.round(parseFloat(meal.macros.protein) * scalingFactor);
    const adjustedMealCarbs = Math.round(parseFloat(meal.macros.carbs) * scalingFactor);
    const adjustedMealFat = Math.round(parseFloat(meal.macros.fat) * scalingFactor);

    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.innerHTML = `
      <div class="meal-header">
        <div class="meal-title">
          <span>${meal.icon}</span>
          ${meal.name}
        </div>
        <div class="meal-time">${meal.time}</div>
      </div>
      <ul class="meal-items">
        ${meal.items.map(item => {
          let adjustedPortion = item.portion;
          if (scalingFactor < 0.9 || scalingFactor > 1.1) {
            adjustedPortion += ` (${scalingFactor > 1 ? 'increase' : 'decrease'} portion by ${Math.round(Math.abs(1 - scalingFactor) * 100)}%)`;
          }
          return `
            <li>
              <span class="item-name">${item.name}</span>
              <span class="item-portion">${adjustedPortion}</span>
            </li>
          `;
        }).join('')}
      </ul>
      <div class="meal-macros">
        <div class="macro-item">
          <div class="macro-value">${adjustedCalories}</div>
          <div class="macro-label">Calories</div>
        </div>
        <div class="macro-item">
          <div class="macro-value">${adjustedMealProtein}g</div>
          <div class="macro-label">Protein</div>
        </div>
        <div class="macro-item">
          <div class="macro-value">${adjustedMealCarbs}g</div>
          <div class="macro-label">Carbs</div>
        </div>
        <div class="macro-item">
          <div class="macro-value">${adjustedMealFat}g</div>
          <div class="macro-label">Fat</div>
        </div>
      </div>
    `;
    mealsContainer.appendChild(mealCard);
  });
}