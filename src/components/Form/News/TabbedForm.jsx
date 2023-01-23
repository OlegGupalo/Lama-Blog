import React from "react";
import TabSwitcher from "./TabSwitcher";
import { Button, TextField } from "@mui/material";
import { DevTool } from "react-hook-form-devtools";
import { useForm, useFormContext, FormProvider } from "react-hook-form";

function IceCream() {
    const { register } = useFormContext();
    return (
      <TextField
        name="flavor"
        label="Favorite Flavor"
        required
        inputRef={register({ required: true })}
      />
    );
  }
  
  function Candy() {
    const { register } = useFormContext();
    return (
      <TextField
        name="candy"
        label="Favorite Candy"
        required
        inputRef={register({ required: true })}
      />
    );
  }

let TabbedForm = () => {
    const methods = useForm();
    const { handleSubmit, control } = methods;

    const onSubmit = data => {
        console.log(data);
    };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            width: 400
          }}
        >
          <TabSwitcher
            tabs={[
              { label: "Ice Cream", component: IceCream },
              { label: "Candy", component: Candy }
            ]}
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
}

export default TabbedForm