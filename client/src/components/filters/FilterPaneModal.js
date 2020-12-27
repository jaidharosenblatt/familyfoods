import { Button } from "antd";
import React from "react";
import ModalWithButton from "../modal/ModalWithButton";
import FilterPane from "./FilterPane";
import { SettingFilled } from "@ant-design/icons";

export default function FilterPaneModal() {
  return (
    <div className="filter-modal">
      <ModalWithButton
        clickable={
          <Button type="primary">
            <h1>
              <SettingFilled /> Options
            </h1>
          </Button>
        }
      >
        <FilterPane mobile />
      </ModalWithButton>
    </div>
  );
}
