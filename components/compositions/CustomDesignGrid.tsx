/** @jsx jsx */
import { jsx } from "@emotion/core";
import { AutoSizer, Grid, WindowScroller } from "react-virtualized";
import CustomDesignItem, {
  HEIGHT,
  WIDTH,
  PADDING
} from "../primitives/CustomDesignItem";

export default function Collections({
  customDesigns
}: {
  customDesigns: any[];
}) {
  return (
    <WindowScroller scrollElement={window}>
      {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => {
            const columnCount = Math.floor(width / (WIDTH + PADDING)) || 1;
            return (
              <Grid
                cellRenderer={({ columnIndex, key, rowIndex, style }) => {
                  const customDesign =
                    customDesigns[columnIndex + rowIndex * columnCount];
                  return (
                    <div
                      key={key}
                      ref={registerChild}
                      style={{
                        ...style,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {customDesign ? (
                        <CustomDesignItem customDesign={customDesign} />
                      ) : null}
                    </div>
                  );
                }}
                style={{ overflowX: "hidden" }}
                autoHeight
                onScroll={onChildScroll}
                columnCount={columnCount}
                columnWidth={Math.ceil(width / columnCount)}
                height={height}
                rowCount={Math.ceil(customDesigns.length / columnCount)}
                rowHeight={HEIGHT + PADDING}
                width={width}
                scrollTop={scrollTop}
                isScrolling={isScrolling}
              />
            );
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}
