/** @jsx jsx */
import { jsx } from "@emotion/core";
import { FaCheck, FaQuestion, FaTimes } from "react-icons/fa";
import dateAdd from "date-fns/add";
import format from "date-fns/format";
import dayDiff from "date-fns/differenceInCalendarDays";
import CheckboxPill from "../primitives/CheckboxPill";
import Heading from "../primitives/Heading";
import Panel from "../primitives/Panel";
import useLocalstorage, { LocalStorageKeys } from "../hooks/useLocalstorage";
import { colors, styles as generalStyles } from "../../util/theme";

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  interactive: {
    userSelect: "none",
    cursor: "pointer"
  },
  pill: {
    display: "inline-block",
    backgroundColor: colors.blueDark,
    color: colors.blueLight,
    padding: 5,
    borderRadius: "0.3em",
    margin: "2px 5px"
  }
} as const;

export default function MoneyTreeTracker() {
  const [days, setDays] = useLocalstorage<
    { id: number; value: boolean | undefined; date: string }[]
  >(LocalStorageKeys.MONEY_TREE_TRACKER, []);
  return (
    <div>
      <Heading
        containerStyle={{ display: "flex", justifyContent: "center" }}
        style={{ marginTop: 20 }}
      >
        Fertile Money Tree
      </Heading>
      <Panel>
        <p>
          This is for tracking Fertile Money Tree patterns as explained in{" "}
          <a
            href="https://www.youtube.com/watch?v=rUc2KljVxSw"
            css={generalStyles.link}
          >
            this YouTube video
          </a>
          .
        </p>
        <p>
          Some days you can bury more than 10k as the money tree, earning more
          money. Some people think there might be a pattern to it, and you can
          use this to track the pattern.
        </p>
        <p>
          You can test each day by burying more than 10k, and if the resulting
          money tree gets you more than 30k, it is a "fertile" day.
        </p>
        <p>
          Add days and mark them as fertile <FaCheck /> or normal <FaTimes />,
          and the current prediction for the next week will be filled out.
          Anything that's unknown <FaQuestion /> is assumed to be normal{" "}
          <FaTimes />. Once you know your pattern, remove days back down to your
          pattern! The area below will predict the next week of days from the
          pattern.
        </p>
      </Panel>
      <div css={styles.row}>
        <div
          css={{ ...styles.pill, ...styles.interactive }}
          onClick={() =>
            setDays(d =>
              d.concat({
                id: d.length ? d[d.length - 1].id + 1 : 0,
                value: undefined,
                date: d.length
                  ? dateAdd(new Date(d[d.length - 1].date), {
                      days: 1
                    }).toISOString()
                  : new Date().toISOString()
              })
            )
          }
        >
          Add day
        </div>
        <div
          css={{ ...styles.pill, ...styles.interactive }}
          onClick={() => setDays(d => d.slice(0, -1))}
        >
          Remove day
        </div>
      </div>
      <div css={{ ...styles.row, width: 800, maxWidth: "90vw", marginTop: 10 }}>
        {days.map((d, i) => (
          <DayPill
            key={i}
            label={format(new Date(d.date), "dd/MM")}
            checked={d.value}
            onChange={nextValue =>
              setDays(existing => {
                const index = existing.findIndex(({ id }) => d.id === id);
                return [
                  ...[...existing].splice(0, index),
                  { ...existing[index], value: nextValue },
                  ...[...existing].splice(index + 1)
                ];
              })
            }
          />
        ))}
      </div>
      <Heading
        size={16}
        containerStyle={{ display: "flex", justifyContent: "center" }}
        style={{ marginTop: 20 }}
      >
        Weekly Prediction
      </Heading>
      <div
        css={{ ...styles.row, width: 800, maxWidth: "90vw", marginBottom: 10 }}
      >
        {Array.from({ length: 7 })
          .map((_, i) => dateAdd(new Date(), { days: i }))
          .map(d => (
            <div key={d.toString()} css={styles.pill}>
              <div>{format(d, "dd/MM")}</div>
              <div css={{ textAlign: "center", marginTop: 2 }}>
                <Prediction pattern={days} day={d} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Prediction({ pattern, day }: { pattern: any[]; day: any }) {
  if (!pattern.length) return <FaQuestion />;
  const patternValues = pattern.map(({ value }) => value);
  const daysSinceStartOfPattern = dayDiff(day, new Date(pattern[0].date));
  const mod = daysSinceStartOfPattern % pattern.length;
  return patternValues[mod] ? <FaCheck /> : <FaTimes />;
}

function DayPill({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean | undefined;
  onChange: (state: boolean | undefined) => void;
}) {
  return (
    <CheckboxPill
      checked={checked}
      icon={<FaCheck />}
      intermediateIcon={<FaQuestion />}
      uncheckedIcon={<FaTimes />}
      allowIntermediate
      onChange={onChange}
      label={label}
    />
  );
}
