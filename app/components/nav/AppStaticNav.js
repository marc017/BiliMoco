import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import colors from '../../config/colors';
import {
  AppFormField,
  SubmitButton,
  AppForm,
  AppFormPicker,
} from '../forms';
import IconButton from '../IconButton';

const validationSchema = Yup.object().shape({
  keyword: Yup.string(),
});

function AppStaticNav({ onSubmit }) {
  const [formValue, setFormValue] = useState();
  const [isBusy, setIsBusy] = useState(true);

  const showFilterSelect = () => {
    console.log('showFilter');
  }

  useEffect(() => {
    setFormValue({
      keyword: '',
    });

    
  }, []);

  return (
    <View style={styles.container}>
      <AppForm
          initialValues={{keyword: ''}}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
        {/* <IconButton
            iconName='filter'
            iconPack='fontawesome'
            backgroundColor={colors.secondary}
            onPress={() => { console.log('test')}}  
          /> */}
        {/* <AppFormPicker
          items={categories}
          name='category'
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
          placeholder='Category'
          width='50%'
        /> */}
        <IconButton
              iconName='search'
              iconPack='fontawesome'
              backgroundColor={colors.primary}
              type='submit'
              isCircle='false'
            />
        <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search '
            name='keyword'
            width='80%'
            label=''
            style={styles.searchBar}
          />
          
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    
  },
  searchBar: {
    width: '80%',
    fontSize: 14,
    color: colors.black,
    // flex: 1,
    margin: 0,
    paddingHorizontal: 5
    // height: '100%'
  },
  searchBtn: {
    width: '10%',
    flex: 1

  }
  

})

export default AppStaticNav;