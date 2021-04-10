import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormPicker,
  AppFormField,
  SubmitButton,
} from '../../components/forms';
import categoryApi from '../../api/categories';
import CategoryPickerItem from '../../components/CategoryPickerItem';
import { set } from 'react-native-reanimated';
import FormImagePicker from '../../components/forms/FormImagePicker';
import AppText from '../../components/AppText';
import numberTransform from '../../utility/numberTransform';
import colors from '../../config/colors';
import UploadScreen from '../UploadScreen';
import storeItemApi from '../../api/storeItems';
import storeApi from '../../api/stores';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label('Title'),
  description: Yup.string().label('Description'),
  price: Yup.number().required().min(1).max(500000).label('Price'),
  stockQty: Yup.number().required().min(1).max(999).label('Stock Quantity'),
  category: Yup.string().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please selecet at least one image.'),
});

function MyStoreItemsEditScreen({ route }) {
  const storeItem = route.params;
  const [formValue, setFormValue] = useState();
  const [categories, setCategories] = useState([]);
  const [vendorPrice, setVendorPrice] = useState(0);
  const [systemPrice, setSystemPrice] = useState(0);
  const [commissionPrice, setCommissionPrice] = useState(0);
  const [commRate, setCommRate] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBusy, setIsBusy] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);

  const getStore = async () => {
    const temp = await storeApi.getUserStoreList();

    if (!temp.ok) return;
    return temp.data;
  };

  const getCategories = async () => {
    const temp = await categoryApi.getCategoryList();

    if (!temp.ok) return console.error('failed to retrieve categories');
    setCategories(temp.data);
    getFormValue(temp.data);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // get the commission rate from category list
    const commissionRate = +category.commission_rate * 0.01;
    const temp = commissionRate * +systemPrice;
    setCommRate(commissionRate);
    handlePriceUpdate();
  };

  const calculateCommPrice = (price) => {
    const temp = +commRate * +price;
    return temp;
  };

  const handlePriceUpdate = (price) => {
    const commPrice = calculateCommPrice(price);
    const vendPrice = +price - +commPrice;
    setCommissionPrice(commPrice);
    setVendorPrice(vendPrice);
  };

  const handleAdd = async (storeItem, storeId, categoryId, commissionPrice) => {
    const result = await storeItemApi.addStoreItem(
      {
        ...storeItem,
        categoryId: categoryId,
        storeId: storeId,
        commission: commissionPrice,
      },
      (progress) => setProgress(progress)
    );

    return result;
  };

  const handleUpdate = async (item, storeId, categoryId, commissionPrice) => {
    const result = await storeItemApi.updateStoreItem(
      {
        ...item,
        id: storeItem.id,
        categoryId: categoryId,
        storeId: storeId,
        commission: commissionPrice,
      },
      (progress) => setProgress(progress)
    );
  };

  const handleSubmit = async (storeItem) => {
    setProgress(0);
    setUploadVisible(true);

    const categoryId = categories.find(
      (c) => c.label.trim() === storeItem.category.trim()
    ).id;

    const store = await getStore();
    let result = {};

    if (!isUpdate) {
      result = await handleAdd(
        storeItem,
        store.id,
        categoryId,
        commissionPrice
      );
    } else {
      result = await handleUpdate(
        storeItem,
        store.id,
        categoryId,
        commissionPrice
      );
    }
  };

  const getFormValue = async (categoryList) => {
    const store = route.params;
    let temp = {};

    if (storeItem) {
      setIsUpdate(true);
      const category = categoryList.find((c) => c.id === +storeItem.id);
      const comm = category.commission_rate * 0.01 * storeItem?.price;
      setCommissionPrice(comm);
      setCommRate(category.commission_rate * 0.01);
      let images = [];
      store.images.map((img) => images.push(img.url));
      temp = {
        name: storeItem?.item_name || '',
        price: storeItem?.price || '',
        description: storeItem?.item_desc || '',
        category: category.label || '',
        images: images || '',
        stockQty: `${storeItem?.stock_qty}` || 1,
      };
    }

    if (!store) {
      temp = {
        name: '',
        price: '',
        description: '',
        category: null,
        images: [],
        stockQty: 0,
      };
    }
    setFormValue(temp);
    setIsBusy(false);
  };

  useEffect(() => {
    setFormValue({
      name: '',
      price: '',
      description: '',
      category: null,
      images: [],
      stockQty: 0,
    });

    getCategories();
  }, []);

  return (
    <View style={styles.container}>
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
            <FormImagePicker name='images' />
            <AppFormField
              autoCorrect={false}
              maxLength={9}
              name='name'
              placeholder='Item name'
              label='Item Name'
            />
            <AppFormField
              autoCorrect={false}
              name='description'
              placeholder='Item Description'
              label='Item Description'
              multiline={true}
              numberOfLines={100}
              style={{ height: 100, textAlignVertical: 'top' }}
            />
            <AppFormField
              keyboardType='numeric'
              maxLength={9}
              name='stockQty'
              placeholder='Stock Quantity'
              label='Stock Quantity'
              width={'50%'}
            />
            {categories ? (
              <>
                <AppFormPicker
                  items={categories}
                  name='category'
                  PickerItemComponent={CategoryPickerItem}
                  numberOfColumns={1}
                  placeholder='Category'
                  label='Category'
                  width='50%'
                  onSelect={(category) => handleCategorySelect(category)}
                />
                <AppFormField
                  keyboardType='numeric'
                  maxLength={9}
                  name='price'
                  placeholder='Price'
                  label='Price'
                  width={'50%'}
                  icon={'currency-php'}
                  onChangeText={(price) => {
                    setSystemPrice(+price);
                    handlePriceUpdate(+price);
                  }}
                />
                {systemPrice ? (
                  <View style={styles.priceContainer}>
                    <AppText style={styles.commission}>
                      Commission : P{' '}
                      {numberTransform.numberWithComma(commissionPrice)} (
                      {commRate * 100}%)
                    </AppText>
                    <AppText></AppText>
                    <AppText style={styles.receive}>
                      Receive : P {numberTransform.numberWithComma(vendorPrice)}
                    </AppText>
                  </View>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <SubmitButton
              style={styles.submitButton}
              title='Save'
              color='secondary'
            />
          </AppForm>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  priceContainer: {
    marginBottom: 20,
  },
  commission: {
    color: colors.warning,
    fontWeight: '800',
  },
  receive: {
    color: colors.secondary,
    fontWeight: '800',
  },
});

export default MyStoreItemsEditScreen;
