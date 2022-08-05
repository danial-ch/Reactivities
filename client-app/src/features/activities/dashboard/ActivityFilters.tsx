import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Button, Header, Menu, Reveal, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
  const {
    activityStore: { predicate, setPredicate, loadingInitial : loading },
  } = useStore();

  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All Activities"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I'm going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
        <Menu.Item
          content="I'm hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date: Date) => setPredicate("startDate", date as Date)}
        value={predicate.get("startDate") || new Date()}
      />
      {predicate.has("startDate") && (
        <Segment attached>
          <Reveal animated="fade" instant>
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button
                fluid
                color="teal"
                content={"Activities After " + format(predicate.get("startDate") as Date, "MMMM d, yyyy")}
              />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: "100%" }}>
              <Button
                icon="delete"
                fluid
                color="red"
                content={"Reset Date"}
                disabled={loading}
                loading={loading}
                onClick={() => setPredicate("resetStartDate", "true")}
              />
            </Reveal.Content>
          </Reveal>
        </Segment>
      )}
    </>
  );
});
