import Link from "next/link";
import EventsHeaderBar from "../components/compositions/EventsHeaderBar";
import { colors } from "../util/theme";

export default function Events() {
  return (
    <>
      <EventsHeaderBar />
      <div css={{ textAlign: "center" }}>
        <div>
          <div
            css={{
              backgroundColor: colors.offWhite,
              color: colors.brownDark,
              display: "inline-block",
              maxWidth: 400,
              margin: "10px auto",
              padding: 20,
              borderRadius: "1em"
            }}
          >
            Track your progress on events here!
          </div>
        </div>
        <Link href="/events/bunny">
          <a>
            <img src="/images/zippy.png" css={{ height: 200, marginTop: 20 }} />
            <div>
              <div
                css={{
                  backgroundColor: colors.blueDark,
                  color: colors.blueLight,
                  display: "inline-block",
                  padding: 10,
                  borderRadius: "0.3em"
                }}
              >
                🐰 Bunny Day 🐰
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}
