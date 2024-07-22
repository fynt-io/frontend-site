import React from "react";
import { Meta, StoryFn  } from "@storybook/react";
import Button from "../app/components/Layout/Buttons/Button";
import { ThemeProvider } from "@/app/theme-provider";

interface ButtonProps {
  url?: string | null;
  responsive?: boolean;
  text?: string;
  className?: string;
  square?: boolean;
  disabled?: boolean;
  buttonStyle?: string;
  icon?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string | null;
  height?: string | null;
  padding?: string | null;
  color?: string | null;
  textColor?: string | null;
  responsiveSquare?: boolean;
  iconOnTheLeft?: boolean;
  target?: string;
  iconImage?: string;
}

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, { globals }) => {
      return (
        <ThemeProvider forcedTheme={globals.scheme} enableSystem={true} attribute="class">
          <div style={{ margin: '3em' }}>
            {/* Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it */}
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
} as Meta;

const Template: StoryFn <ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: "Primary Button",
  buttonStyle: "primary-button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Secondary Button",
  buttonStyle: "secondary-button",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  text: "Tertiary Button",
  buttonStyle: "tertiary-button",
};

export const YellowGreenish = Template.bind({});
YellowGreenish.args = {
  text: "Yellow Greenish",
  buttonStyle: "accent-button-yellow-greenish",
};

export const AccentButton = Template.bind({});
AccentButton.args = {
  text: "Accent Button",
  buttonStyle: "accent-button",
};