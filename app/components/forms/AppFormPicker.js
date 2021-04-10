import React from 'react';
import { useFormikContext } from 'formik';

import AppErrorMessage from './AppErrorMessage';
import AppPicker from '../AppPicker';

function AppFormPicker({
  items,
  name,
  PickerItemComponent,
  numberOfColumns,
  placeholder,
  width,
  onSelect,
  ...otherProps
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => {
          setFieldValue(name, item.label);
          onSelect(item);
        }}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
        placeHolder={placeholder}
        selectedItem={values[name]}
        width={width}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
