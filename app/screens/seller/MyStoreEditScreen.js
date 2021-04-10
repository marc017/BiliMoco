import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import Screen from '../../components/Screen';
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from '../../components/forms';
import FormImagePicker from '../../components/forms/FormImagePicker';
import addressApi from '../../api/address';
import storeApi from '../../api/stores';
import storeCategoryApi from '../../api/storeCategory';
import AppPickerItem from '../../components/AppPickerItem';
import UploadScreen from '../UploadScreen';

const validationSchema = Yup.object().shape({
  storeName: Yup.string().required(),
  storeDesc: Yup.string().required(),
  images: Yup.array().max(1, 'Please selecet just one image.').required(),
  storeUrl: Yup.string().required(),
  addressId: Yup.string().required(),
  categoryId: Yup.string().required(),
  mobileNo: Yup.number().required().test('len', 'Invalid mobile number format. Should be a valid mobile no. (ex. 9123456789)', val => {
    return val.toString().length === 10;
  }),
  email: Yup.string().email().required()
});

function MyStoreEditScreen({ route, navigation }) {
  const isNew = route.params.isNew;
  const [formValue, setFormValue] = useState();
  const [addressList, setAddressList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [isBusy, setIsBusy] = useState(true);

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const getAddressList = async () => {
    const temp = await addressApi.getAddressList();
    const modifiedList = [];
    temp.data.map((address) => {
      modifiedList.push({
        ...address,
        value: +address.id,
        addressLabel: address.label,
      });
    });
    setAddressList(modifiedList);
    getFormValue(modifiedList);
  };

  const getCategoryList = async () => {
    const temp = await storeCategoryApi.getCategoryList();
    const modifiedList = [];
    temp.data.map((category) => {
      modifiedList.push({
        ...category,
        value: +category.id,
        label: category.name
      })
    });
    setCategoryList(modifiedList);
    getFormValue(modifiedList);
  }

  const getFormValue = (modifiedAddressList) => {
    const store = route.params.store;
    let images = [];
    let temp = {};
    if (store) {
      images.push(store.images.url);
      const address = modifiedAddressList.find(
        (m) => +m.value == +store.address_id
      );
      setSelectedAddressId(store.address_id);
      setSelectedCategoryId(store.store_category_id);
      temp = {
        storeName: store?.store_name || '',
        storeDesc: store?.store_desc || '',
        images: images || '',
        storeUrl: store?.store_url || '',
        addressId: address.label || '',
        mobileNo: store?.mobile_no || '',
        email: store?.email || '',
        categoryId: store?.store_category_id || ''
      };
    }

    if (!store) {
      temp = {
        storeName: '',
        storeDesc: '',
        storeUrl: '',
        addressId: 0,
        images: [],
        mobileNo: '',
        email: '',
        categoryId: ''
      };
    }
    setFormValue(temp);
    setIsBusy(false);
  };

  const handleAdd = async (storeInfo) => {
    const result = await storeApi.addStore(
      { ...storeInfo, address_id: selectedAddressId },
      (progress) => setProgress(progress)
    );
  };

  const handleUpdate = async (storeInfo) => {
    const store = route.params.store;
    const result = await storeApi.updateStore(
      { ...storeInfo, id: store.id, address_id: selectedAddressId, category_id: selectedCategoryId },
      (progress) => setProgress(progress)
    );
  };

  const handleSubmit = async (storeInfo) => {
    setProgress(0);
    setUploadVisible(true);
    const store = route.params.store;
    if (store) {
      handleUpdate(storeInfo);
    } else {
      handleAdd(storeInfo);
    }
  };

  useEffect(() => {
    setFormValue({
      storeName: '',
      storeDesc: '',
      images: [],
      storeUrl: '',
      addressId: 0,
      mobileNo: '',
      email: '',
      categoryId: ''
    });

    getAddressList();
    getCategoryList();
  }, []);

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
      {!isBusy ? (
        <AppForm
          initialValues={formValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name='images' hideInputAfterAdd={true} />
          <AppFormField
            maxLength={255}
            name='storeName'
            placeholder='Store Name'
            label='Store Name'
          />
          <AppFormField
            maxLength={255}
            name='storeDesc'
            placeholder='Store Description'
            label='Store Description'
          />
          <AppFormField
            maxLength={255}
            name='storeUrl'
            placeholder='Store URL Tag (Used for sharing Store Link)'
            label='Store URL Tag'
          />
          {categoryList ? (
            <AppFormPicker
              items={categoryList}
              name='categoryId'
              PickerItemComponent={AppPickerItem}
              numberOfColumns={1}
              placeholder='Store Category'
              label='Store Category'
              width='70%'
              onSelect={(item) => {
                console.log(item);
                setSelectedCategoryId(item.id);
              }}
            />
          ) : (
            <></>
          )}
          {addressList ? (
            <AppFormPicker
              items={addressList}
              name='addressId'
              PickerItemComponent={AppPickerItem}
              numberOfColumns={1}
              placeholder='Address'
              label='Address'
              width='70%'
              onSelect={(item) => {
                setSelectedAddressId(item.id);
              }}
            />
          ) : (
            <></>
          )}
          <AppFormField
            maxLength={11}
            name='mobileNo'
            placeholder='Mobile Number'
            label='Mobile No'
            isMobileNo='true'
          />
          <AppFormField
            maxLength={255}
            name='email'
            placeholder='Email'
            label='Email'
          />
          <SubmitButton title='Save' />
        </AppForm>
      ) : (
        <></>
      )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export default MyStoreEditScreen;
