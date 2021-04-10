import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {
  AppFormField,
  SubmitButton,
  AppForm,
  AppFormPicker,
} from '../components/forms';

import AddressUtil from '../utility/address/address';
import addressApi from '../api/address';
import useLocation from '../hooks/useLocation';

import AppPickerItem from '../components/AppPickerItem';
import UploadScreen from './UploadScreen';
import AppMap from '../components/AppMap';
import storage from '../auth/storage';
import routes from '../navigation/routes';
import { Switch } from 'react-native-paper';
import colors from '../config/colors';
import AppText from '../components/AppText';

const validationSchema = Yup.object().shape({
  label: Yup.string().required(),
  address: Yup.string().required(),
  province: Yup.string().required(),
  city: Yup.string().required(),
  brgy: Yup.string().required(),
});

function AddressEditScreen({ route, navigation }) {
  const [addressItem, setAddressItem] = useState();
  const [formValue, setFormValue] = useState();
  const [isBusy, setIsBusy] = useState(true);

  const addressToUpdate = route.params.item;

  const location = useLocation();
  const [user, setUser] = useState();

  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const [provinceList, setProvinceList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [brgyList, setBrgyList] = useState([]);

  const [cityListFilter, setCityListFilter] = useState([]);
  const [brgyListFilter, setBrgyListFilter] = useState([]);

  const [provinceSelected, setProvinceSelected] = useState();
  const [citySelected, setCitySelected] = useState();
  const [brgySelected, setBrgySelected] = useState();

  const [userLocation, setUserLocation] = useState();

  const [isDefault, setIsDefault] = useState(false);

  const testLoc = location;

  const getLocationList = async () => {
    const { provinces, cities, brgys } = await AddressUtil.getAllAddress();

    await setProvinceList(provinces);
    await setCityListFilter(cities);
    await setCityList(cities);
    await setBrgyList(brgys);
    await setBrgyListFilter(brgys);
  };

  const setInitAddress = async () => {
    getLocationList().then(() => {
      let usrLoc = {};
      if (route.params.item) {
        const { item } = route.params;
        setAddressItem(item);

        usrLoc = {
          latitude: item?.latitude,
          longitude: item?.longitude,
        };
        setIsDefault(item.is_default);
        setFormValue({
          id: item.id,
          label: item?.label,
          address: item?.address,
          province: item?.province,
          city: item?.city,
          brgy: item?.brgy,
        });
        // setUserLocation(usrLoc);
      } else {
        setFormValue({
          label: '',
          address: '',
          province: '',
          city: '',
          brgy: '',
          // province: 'ZAMBALES',
          // city: 'OLONGAPO CITY',
          // brgy: 'New Kalalake',
        });
      }

      setIsBusy(false);
    });
  };

  useEffect(() => {
    if (location) {
      // setUserLocation(location);
    }
    setUserLocation(location);
    setFormValue({
      label: '',
      address: '',
      province: '',
      city: '',
      brgy: '',
    });
    setInitAddress();
    storage.getUser().then((user) => {
      setUser(user);
    });
  }, []);

  const onPinToMap = (usrLocation) => {
    if (!usrLocation) return setUserLocation(location);
    setUserLocation(usrLocation);
  };

  const handleSubmit = async (item, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const tempLoc = userLocation ? userLocation : location;

    let result = [];
    if (route.params.isNew) {
      result = await addressApi.addAddress(
        { ...item, tempLoc, user },
        (progress) => setProgress(progress)
      );
    } else {
      // update
      result = await addressApi.updateAddress(
        { ...item, tempLoc, user },
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert('Could not save the listing');
    }
    resetForm();
    navigation.navigate(routes.ADDRESSES);
  };

  const toggleSwitch = () => {
    if (!isDefault) {
      // set address to default
      const address = route.params.item;
      const result = addressApi.setDefaultAddress(address.id);
    }

    setIsDefault(!isDefault);
  };

  return (
    <Screen style={styles.container}>
      
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <ScrollView>
        {addressItem ? (
          <View>
            <AppText>Set Default Address</AppText>
            <Switch
              trackColor={{ false: '#767577', true: colors.secondary }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isDefault}
            />
          </View>
        ) : (
          <></>
        )}

        {!isBusy ? (
          <AppForm
            initialValues={formValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField maxLength={255} label='Label' name='label' placeholder='Label' />
            <AppFormField maxLength={255} label='Address' name='address' placeholder='Address' />
            {provinceList ? (
              <AppFormPicker
                items={provinceList}
                name='province'
                label='province'
                PickerItemComponent={AppPickerItem}
                numberOfColumns={1}
                placeholder='Province'
                width='70%'
                onSelect={async (item) => {
                  setProvinceSelected(null);
                  await setCityList(
                    cityListFilter.filter((city) => city.parent === item.code)
                  );
                  setProvinceSelected(item);
                }}
              />
            ) : (
              <></>
            )}

            {cityList ? (
              <AppFormPicker
                items={cityList}
                name='city'
                label='city'
                PickerItemComponent={AppPickerItem}
                numberOfColumns={1}
                placeholder='City'
                width='70%'
                onSelect={(item) => {
                  setCitySelected(item);
                  setBrgyList(
                    brgyListFilter.filter((brgy) => brgy.parent === item.code)
                  );
                  setBrgySelected(null);
                }}
              />
            ) : (
              <></>
            )}

            {brgyList ? (
              <AppFormPicker
                items={brgyList}
                name='brgy'
                label='Barangay'
                PickerItemComponent={AppPickerItem}
                numberOfColumns={1}
                placeholder='Barangay'
                width='70%'
                onSelect={(item) => {
                  setBrgySelected(item);
                }}
              />
            ) : (
              <></>
            )}
            <View style={styles.mapContainer}>
              <AppText style={styles.label}>Pin to Map</AppText>
              {addressItem ? (
                <AppMap
                  location={{
                    latitude: +addressItem?.latitude,
                    longitude: +addressItem?.longitude,
                  }}
                  title='Your Location'
                  onPinToMap={onPinToMap}
                />
              ) : location ? (
                <AppMap
                  location={location}
                  title='Your Location'
                  onPinToMap={onPinToMap}
                />
              ) : (
                <></>
              )}
            </View>
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
  label: {
    fontWeight: '700',
    marginVertical: 10
  },
  mapContainer: {
    height: 500,
    width: '100%'
  }
});

export default AddressEditScreen;
