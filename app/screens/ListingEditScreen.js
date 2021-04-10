import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';
import * as Location from 'expo-location';

import Screen from '../components/Screen';
import {
  AppFormField,
  SubmitButton,
  AppForm,
  AppFormPicker,
} from '../components/forms';

import useApi from '../hooks/useApi';
import listingApi from '../api/listings';
import CategoryPickerItem from '../components/CategoryPickerItem';
import colors from '../config/colors';
import FormImagePicker from '../components/forms/FormImagePicker';
import useLocation from '../hooks/useLocation';
import UploadScreen from './UploadScreen';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(100000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.string().required().nullable().label('Title'),
  images: Yup.array().min(1, 'Please selecet at least one image.'),
});

const categories = [
  {
    label: 'Frozen',
    value: 1,
    backgroundColor: colors.succes,
    icon: 'apps',
  },
  {
    label: 'Canned',
    value: 2,
    backgroundColor: colors.succes,
    icon: 'apps',
  },
  {
    label: 'Instant',
    value: 3,
    backgroundColor: colors.succes,
    icon: 'apps',
  },
];

function ListingEditScreen(props) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Could not save the listing');
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <AppForm
          initialValues={{
            title: '',
            price: '',
            description: '',
            category: null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name='images' />
          <AppFormField maxLength={255} name='title' placeholder='Title' />
          <AppFormField
            keyboardType='numeric'
            maxLength={9}
            name='price'
            placeholder='Price'
            width={120}
          />
          <AppFormPicker
            items={categories}
            name='category'
            PickerItemComponent={CategoryPickerItem}
            numberOfColumns={3}
            placeholder='Category'
            width='50%'
          />
          <AppFormField
            maxLength={10000}
            multiline
            name='description'
            numberOfLines={5}
            placeholder='Description'
          />

          <SubmitButton title='Save Item' />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
