# Big Features

## Persisting state

feat: save sessions in local storage

(after Workout History)

feat: add sessionId to all links
feat: overwrite sessionId if in param

## Workout history

Notes: instead of versions, just add the name of the workout at the top

feat: separate route for workout
feat: track history of workouts
refactor: make separate placeholder component
feat: add placeholder when no workouts
feat: add historical record of workout on home page

## Change order of timers

TODO if time left after bugfixes and deploy

# Bugfixes

fix: jittery remaining total on refresh
fix: lengthening timer does not clear complete state
fix: jitter on completed to next timer
fix: bug waiting to happen with pausing on Timer unmount
