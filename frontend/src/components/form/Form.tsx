import React from 'react';
import ComponentCard from '../common/ComponentCard';
import DefaultInputs from '../form-elements/DefaultInputs';
import TextAreaInput from '../form-elements/TextAreaInput';
import SelectInputs from '../form-elements/SelectInputs';
import ToggleSwitch from '../form-elements/ToggleSwitch';

const Form: React.FC = () => (
  <ComponentCard title="Sample Form">
    <div className="grid gap-4">
      <DefaultInputs />
      <TextAreaInput />
      <SelectInputs />
      <ToggleSwitch />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded w-max">Submit</button>
    </div>
  </ComponentCard>
);

export default Form;
