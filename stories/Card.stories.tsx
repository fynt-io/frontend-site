import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import  { Card, ExpansiveCard, EditableCard }  from "@/app/components/Layout/Cards/Card";
import { ThemeProvider } from "@/app/theme-provider";

export default {
  title: "Components/Cards",
  component: Card,
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

// Card
const TemplateCard: StoryFn = (args) => <Card {...args} >Conteúdo do cartão</Card>;
export const SimpleCard = TemplateCard.bind({});
SimpleCard.args = {
  children: <div >Conteúdo do Cartão</div>,
};

// ExpansiveCard
const TemplateExpansiveCard: StoryFn = (args) => <ExpansiveCard {...args} >Expansive Card</ExpansiveCard>;
export const SimpleExpansiveCard = TemplateExpansiveCard.bind({});
SimpleExpansiveCard.args = {
  children: <div>Conteúdo do Cartão Expansível</div>,
  title: "Título do Cartão",
};

// EditableCard
const TemplateEditableCard: StoryFn = (args) => <EditableCard children={""} saveFunction={()=>{}} {...args} />;
export const SimpleEditableCard = TemplateEditableCard.bind({});
SimpleEditableCard.args = {
  children: <div>Conteúdo do Cartão Editável</div>,
  title: "Título do Cartão Editável",
};
