// Ours - Components
import WorkoutPlan from "@/components/workout/WorkoutPlan";
import TimerDisplayPlaceholder from "@/components/timer/TimerDisplayPlaceholder";
import WorkoutSummary from "@/components/workout/WorkoutSummary";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerPreview from "@/components/timer/TimerPreview";
import TimerForm from "@/components/timer/TimerForm";
import TimeDisplay from "@/components/ui/TimeDisplay";

// Ours - Types
import { TimerState } from "@/types/timer";

// Ours - Styles
import styles from "./DocumentationPage.module.css";

// Ours - Data
import mockWorkout from "@/data/mock-workout.json";

const exampleTABATA = {
  type: "TABATA",
  workDuration: 20000,
  restDuration: 10000,
  rounds: 8,
};

const docs = [
  {
    comp: WorkoutPlan,
    name: "WorkoutPlan",
    props: {
      plan: mockWorkout,
      selectedTimerId: mockWorkout[2].id,
      onRemove: (id) => {
        console.log("Removing timer", id);
      },
    },
  },
  {
    comp: TimerDisplayPlaceholder,
    name: "TimerDisplayPlaceholder",
    props: {},
  },
  {
    comp: TimerDisplay,
    name: "TimerDisplay",
    props: {
      timerSnapshot: {
        options: exampleTABATA,
        progress: {
          round: 1,
          roundTranspired: 10000,
          isWorking: true,
          roundDuration: 20000,
          state: TimerState.RUNNING,
        },
      },
    },
  },
  {
    comp: TimerPreview,
    name: "TimerPreview",
    props: { options: exampleTABATA },
  },
  {
    comp: TimerForm,
    name: "TimerForm",
    props: {
      onSubmit: (options) => console.log(options),
    },
  },
  {
    comp: TimeDisplay,
    name: "TimeDisplay",
    props: { timeMs: 34250 },
  },
  {
    comp: WorkoutSummary,
    name: "WorkoutSummary",
    props: {
      plan: mockWorkout,
    },
  },
];

const DocumentationPage = () => (
  <div className={styles["component-list"]}>
    {docs.map(({ comp: Comp, name, props }) => {
      return (
        <section key={name}>
          <h2>{`<${name}/>`}</h2>
          <div>
            <Comp {...props} />
          </div>
        </section>
      );
    })}
  </div>
);

export default DocumentationPage;
