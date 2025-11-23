# EvoFit - Documentation

## Overview

EvoFit is a comprehensive fitness web application that provides personalized workout plans and diet plans. The application features user authentication, progress tracking, theme switching, and a responsive design that works across all devices.

## Project Structure

```
EvoFit/
├── index.html          # Landing page
├── login.html          # User authentication page
├── dashboard.html      # Workout dashboard
├── diet.html           # Diet plan page
├── profile.html        # User profile page
├── support.html        # About and contact page
├── ceptemplate.html    # Template file
├── app-storage.js      # Local storage management
├── script.js           # Shared utilities and navigation
├── dashboard.js        # Workout functionality
├── diet.js             # Diet plan functionality
├── support.js          # Support page animations
├── styles.css          # Global styles
├── dashboard.css       # Dashboard-specific styles
├── diet.css            # Diet page-specific styles
└── support.css         # Support page-specific styles
```

---

## Core Files

### `app-storage.js`

**Purpose**: Centralized local storage management for the entire application.

**Key Features**:
- Manages user data, profiles, workout history, and diet plans
- Handles theme preferences
- Stores remembered usernames
- Provides a unified API for data persistence

**Main Functions**:
- `readState()` - Reads the entire application state from localStorage
- `writeState(state)` - Writes state to localStorage
- `getUser(username)` - Retrieves user data by username
- `setUserSection(username, section, value)` - Updates a specific user data section
- `getUserSection(username, section)` - Retrieves a specific user data section
- `getRememberedUser()` / `setRememberedUser(username)` - Manages remembered user
- `getTheme()` / `setTheme(theme)` - Manages theme preference

**Storage Structure**:
```javascript
{
  theme: 'dark' | 'light',
  rememberedUser: string | null,
  users: {
    [username]: {
      password: string,
      profile: { weight, height, level },
      workoutHistory: { totalMinutes, totalCalories, workoutDays, workoutSessions },
      dietPlan: { preference, goal, age, gender, weight, height, activity, bmr, tdee, targetCalories },
      currentWorkout: { workoutActive, currentWorkout }
    }
  }
}
```

---

### `script.js`

**Purpose**: Shared utilities, theme management, authentication helpers, and navigation functionality.

**Key Features**:
- Theme toggle functionality (dark/light mode)
- Mobile navigation menu handling
- Authentication state management
- Profile dropdown menu
- Logout functionality

**Main Components**:
- `EvoFitAuth` object - Authentication helper functions
  - `isLoggedIn()` - Checks if user is logged in
  - `getActiveUsername()` - Gets current logged-in username
  - `clearSession()` - Clears session data
- `updateAuthUI()` - Updates navigation bar based on auth state
- `logoutUser()` - Handles user logout

**Dependencies**: Requires `app-storage.js` to be loaded first.

---

## Page Files

### `index.html`

**Purpose**: Landing page and entry point of the application.

**Features**:
- Hero section with call-to-action
- Feature cards for Workout and Diet plans
- Navigation bar with theme toggle
- Responsive design
- Theme persistence

**Key Elements**:
- Hero section with animated gradient text
- Feature grid showcasing Workout and Diet plans
- Footer with links and copyright

**Dependencies**:
- `styles.css` - Global styling
- `app-storage.js` - Theme management
- `script.js` - Navigation and theme toggle

---

### `login.html`

**Purpose**: User authentication and login page.

**Features**:
- Animated login form with glassmorphism design
- Username autocomplete suggestions
- Remember me functionality
- Password management
- Sign out functionality
- Clear all data option
- Redirect support for protected pages

**Key Functionality**:
- Auto-fills remembered username/password
- Validates credentials
- Creates new users automatically
- Stores session in sessionStorage
- Redirects to dashboard or specified page after login

**Dependencies**:
- `styles.css` - Base styling
- `app-storage.js` - User data management
- `script.js` - Shared utilities

**Authentication Flow**:
1. User enters username and password
2. System checks if user exists
3. If new user, creates account automatically
4. If existing user, validates password
5. Stores session and redirects

---

### `dashboard.html`

**Purpose**: Main workout dashboard where users track and perform workouts.

**Features**:
- User profile display (weight, height, fitness level, BMI)
- Workout statistics (total time, calories, workouts completed, streak)
- Level switcher (Beginner, Intermediate, Advanced)
- Exercise cards with progress tracking
- Workout timer
- Progress bar
- Monthly progress tracking
- Workout completion celebration
- Reset functionality

**Key Components**:
- **Personal Profile Card**: Displays user stats and BMI
- **Workout Statistics Card**: Shows cumulative workout data
- **Level Switcher**: Allows changing workout intensity
- **Exercise Grid**: 12 exercises with rep counts based on level
- **Progress Tracking**: Visual progress bar and completion counter
- **Monthly Progress**: 30-day statistics and recent activity

**Workout Exercises**:
1. Push-Ups
2. Squats
3. Burpees
4. Plank
5. Lunges
6. Mountain Climbers
7. Jumping Jacks
8. Tricep Dips
9. High Knees
10. Side Plank
11. Bicycle Crunches
12. Wall Sit

**Dependencies**:
- `styles.css` - Base styling
- `dashboard.css` - Dashboard-specific styles
- `app-storage.js` - Data persistence
- `script.js` - Shared utilities
- `dashboard.js` - Workout logic

**Authentication**: Requires login (redirects to login page if not authenticated)

---

### `dashboard.js`

**Purpose**: Handles all workout-related functionality.

**Key Features**:
- Exercise data management
- Workout state management
- Progress tracking
- Workout persistence (resume interrupted workouts)
- Statistics calculation
- BMI calculation
- Streak calculation

**Main Functions**:
- `initializeApp()` - Initializes the dashboard
- `startWorkout()` - Begins a new workout session
- `completeExercise(index)` - Marks an exercise as completed
- `completeWorkout()` - Finalizes workout and saves statistics
- `updateDashboard()` - Updates all dashboard displays
- `calculateBMI(weight, height)` - Calculates Body Mass Index
- `calculateStreak(workoutDays)` - Calculates consecutive workout days
- `updateMonthlyProgress(history)` - Updates 30-day statistics

**Workout Persistence**:
- Saves workout state to localStorage
- Can resume interrupted workouts
- Tracks completed exercises
- Maintains timer state

**Statistics Tracking**:
- Total workout minutes
- Total calories burned
- Number of workouts completed
- Current streak (consecutive days)
- Monthly consistency percentage

---

### `diet.html`

**Purpose**: Personalized diet plan page.

**Features**:
- Multi-step setup wizard
- Dietary preference selection (Vegetarian/Non-Vegetarian)
- Fitness goal selection (Weight Loss/Muscle Gain/Maintenance)
- Body metrics input (age, gender, weight, height, activity level)
- BMR and TDEE calculation
- Target calories calculation
- Meal plan display with macros
- Nutrition summary
- Diet tips and guidelines

**Setup Flow**:
1. **Step 1**: Choose diet type (Vegetarian/Non-Vegetarian)
2. **Step 2**: Select fitness goal (Weight Loss/Muscle Gain/Maintenance)
3. **Step 3**: Enter body details (age, gender, weight, height, activity level)
4. System calculates BMR, TDEE, and target calories
5. Displays personalized meal plan

**Meal Structure**:
- Breakfast (7:00 AM - 8:00 AM)
- Lunch (1:00 PM - 2:00 PM)
- Snack (4:00 PM - 5:00 PM)
- Dinner (7:30 PM - 8:30 PM)

Each meal includes:
- Food items with portions
- Calorie count
- Protein, Carbs, and Fat breakdown

**Dependencies**:
- `styles.css` - Base styling
- `diet.css` - Diet page-specific styles
- `app-storage.js` - Data persistence
- `script.js` - Shared utilities
- `diet.js` - Diet plan logic

---

### `diet.js`

**Purpose**: Handles diet plan generation and management.

**Key Features**:
- BMR calculation using Mifflin-St Jeor Equation
- TDEE calculation based on activity level
- Target calories adjustment based on goals
- Meal plan scaling based on target calories
- Diet plan persistence

**Main Functions**:
- `calculateBMR(weight, height, age, gender)` - Calculates Basal Metabolic Rate
- `updateCalculations()` - Updates BMR, TDEE, and target calories in real-time
- `loadDietPlan()` - Loads and displays the diet plan
- `persistDietPlan()` - Saves diet plan to storage
- `bootstrapDietPage()` - Initializes page with saved data

**Activity Multipliers**:
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Active: 1.725
- Very Active: 1.9

**Calorie Adjustments**:
- Weight Loss: TDEE - 500 calories
- Muscle Gain: TDEE + 300 calories
- Maintenance: TDEE (no adjustment)

**Base Diet Plans**:
- Vegetarian: 2000 calories/day
- Non-Vegetarian: 2100 calories/day

Plans are scaled proportionally based on user's target calories.

---

### `profile.html`

**Purpose**: User profile page displaying personal information and diet plan summary.

**Features**:
- Personal information display (username, weight, height, fitness level)
- BMI calculation and categorization
- Diet plan summary
- Links to update profile or view full diet plan

**BMI Categories**:
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 25
- Overweight: BMI ≥ 25

**Dependencies**:
- `styles.css` - Base styling
- `app-storage.js` - Data retrieval
- `script.js` - Shared utilities

**Authentication**: Requires login (redirects to login page if not authenticated)

---

### `support.html`

**Purpose**: About page and contact information.

**Features**:
- About section with company information
- Contact form
- Contact information (location, email, phone)
- Scroll-triggered animations

**Dependencies**:
- `styles.css` - Base styling
- `support.css` - Support page-specific styles
- `app-storage.js` - Theme management
- `script.js` - Shared utilities
- `support.js` - Scroll animations

---

### `support.js`

**Purpose**: Handles scroll-triggered animations for the support page.

**Functionality**:
- Reveals cards as they enter the viewport
- Animates paragraph box on scroll
- Uses Intersection Observer-like logic

---

## Styling Files

### `styles.css`

**Purpose**: Global styles and theme variables.

**Features**:
- CSS custom properties for theming
- Dark and light theme support
- Navigation bar styling
- Hero section styling
- Feature cards styling
- Footer styling
- Mobile responsive design
- Profile dropdown styles

**Theme Variables**:
- `--bg-primary` - Primary background color
- `--bg-secondary` - Secondary background color
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text color
- `--accent-color` - Accent color (purple/indigo)
- `--border-color` - Border color
- `--shadow` - Box shadow
- `--nav-bg` - Navigation background

---

### `dashboard.css`

**Purpose**: Dashboard-specific styling.

**Features**:
- Card layouts and animations
- Exercise card styling
- Progress bar animations
- Modal styling
- Completion message styling
- Monthly progress grid
- Level switcher styling
- Responsive design

**Key Animations**:
- Fade in/out effects
- Slide up animations
- Shimmer effects on progress bars
- Bounce in for completion message
- Pulse effects for BMI indicator

---

### `diet.css`

**Purpose**: Diet page-specific styling.

**Features**:
- Modal wizard styling
- Meal card layouts
- Nutrition summary grid
- Goal badge styling
- Form styling
- Tips section styling
- Responsive design

**Key Components**:
- Multi-step modal with transitions
- Meal cards with hover effects
- Nutrition grid with macro breakdowns
- Goal badges with color coding

---

### `support.css`

**Purpose**: Support page-specific styling.

**Features**:
- Card container layouts
- Scroll-triggered animations
- Contact form styling
- Contact info card styling
- Paragraph box with slide-in animation

---

## Template File

### `ceptemplate.html`

**Purpose**: Template file for creating new pages.

**Features**:
- Basic page structure
- Navigation bar
- Theme toggle
- Mobile menu
- Footer
- Inline styles for quick setup

**Usage**: Copy this file as a starting point for new pages.

---

## Data Flow

### User Registration/Login Flow

1. User visits `login.html`
2. Enters username and password
3. System checks if user exists in `app-storage.js`
4. If new user, creates account automatically
5. Stores session in `sessionStorage`
6. Redirects to `dashboard.html` or specified page

### Workout Flow

1. User logs in and visits `dashboard.html`
2. If first time, modal appears for profile setup
3. User enters weight, height, and fitness level
4. Dashboard displays user stats and BMI
5. User selects workout level (Beginner/Intermediate/Advanced)
6. User clicks "Start Today's Workout"
7. Exercise cards appear with rep counts based on level
8. User completes exercises one by one
9. Progress bar and timer update in real-time
10. On completion, statistics are saved
11. Completion message appears
12. Workout history is updated

### Diet Plan Flow

1. User visits `diet.html`
2. Modal wizard appears
3. Step 1: Select diet type (Vegetarian/Non-Vegetarian)
4. Step 2: Select fitness goal (Weight Loss/Muscle Gain/Maintenance)
5. Step 3: Enter body details (age, gender, weight, height, activity level)
6. System calculates BMR, TDEE, and target calories
7. User submits form
8. Meal plan is generated and displayed
9. Plan is saved to localStorage
10. User can switch between Vegetarian/Non-Vegetarian anytime

---

## Storage Structure

### LocalStorage (`evoFitApp`)

```javascript
{
  theme: 'dark' | 'light',
  rememberedUser: string | null,
  users: {
    [username]: {
      password: string,
      profile: {
        weight: number,
        height: number,
        level: 'Beginner' | 'Intermediate' | 'Advanced'
      },
      workoutHistory: {
        totalMinutes: number,
        totalCalories: number,
        workoutDays: string[],
        workoutSessions: [{
          date: string,
          duration: number,
          calories: number,
          timestamp: number
        }]
      },
      dietPlan: {
        preference: 'vegetarian' | 'non-vegetarian',
        goal: 'weight-loss' | 'muscle-gain' | 'maintenance',
        age: number,
        gender: 'male' | 'female',
        weight: number,
        height: number,
        activity: string,
        bmr: number,
        tdee: number,
        targetCalories: number
      },
      currentWorkout: {
        workoutActive: boolean,
        currentWorkout: {
          startTime: number,
          completedExercises: number[],
          totalCalories: number,
          duration: number
        }
      }
    }
  }
}
```

### SessionStorage

```javascript
{
  isLoggedIn: 'true' | 'false',
  activeSession: {
    username: string,
    loginTime: number
  }
}
```

---

## Key Features

### 1. User Authentication
- Simple username/password system
- Auto-creation of new users
- Remember me functionality
- Session management

### 2. Workout Tracking
- 12 different exercises
- 3 fitness levels (Beginner, Intermediate, Advanced)
- Real-time progress tracking
- Workout history
- Streak calculation
- Monthly statistics

### 3. Diet Planning
- Personalized meal plans
- BMR and TDEE calculations
- Goal-based calorie adjustments
- Vegetarian and Non-Vegetarian options
- Macro tracking

### 4. Theme Support
- Dark mode (default)
- Light mode
- Persistent theme preference
- Smooth transitions

### 5. Responsive Design
- Mobile-friendly navigation
- Adaptive layouts
- Touch-friendly controls
- Optimized for all screen sizes

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses localStorage and sessionStorage
- CSS Grid and Flexbox support required

---

## Dependencies

- **No external libraries required** - Pure JavaScript, HTML, and CSS
- Font Awesome (loaded via CDN in `login.html` for icons)
- Google Fonts (Poppins) - loaded in `login.html`

---

## Future Enhancements

Potential improvements:
- Backend integration for data persistence
- Social features (sharing workouts, challenges)
- More exercise variations
- Meal plan customization
- Progress charts and graphs
- Export functionality
- Mobile app version
- Push notifications for reminders

---

## Notes

- All data is stored locally in the browser
- No server-side authentication (passwords stored in plain text)
- Suitable for personal use or demonstration purposes
- For production use, implement proper backend security

---

## License

© 2025 EvoFit. All rights reserved.

