'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import Button from '@components/components/Button/Button';
import CustomSelect from '@components/components/CustomSelect/CustomSelect';
import Input from '@components/components/Input/Input';
import validationSchema from '@components/helpers/formValidationSchema';
import { AreaData, SelectOptions } from '@components/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { PhoneNumberUtil } from 'google-libphonenumber';
import debounce from 'lodash/debounce';

import { useStateContext } from '../../../../context/StateContext';

import RadioButtons from './RadioButtons/RadioButtons';
import { fetchAreas, fetchCities, fetchWarehouses } from './api';

import 'react-international-phone/style.css';
import styles from './CheckoutForm.module.scss';

const phoneUtil = PhoneNumberUtil.getInstance();

const validatePhone = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export interface Option {
  value: string;
  label: string;
}

type CheckoutFormValues = {
  // cashOnDelivery?: boolean | undefined;
  // cardPayment?: boolean | undefined;
  // comment?: string | undefined;
  phone?: string;
  firstName: string;
  lastName: string;
  email: string;
  // post: string;
  // deliveryArea: string;
  // deliveryCity: string;
  // postOfficeBranchNum: string;
};

interface CheckoutFormProps {
  dict: {
    contactFormTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    buttonText: string;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  dict: {
    contactFormTitle,
    firstName,
    lastName,
    email,
    phoneNumber,
    buttonText,
  },
}) => {
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  const [areas, setAreas] = useState<AreaData[]>([]);
  const [cities, setCities] = useState<AreaData[]>([]);
  const [warehouse, setWarehouse] = useState<AreaData[]>([]);

  const [inputCity, setInputCity] = useState<string>('');

  const [selectedAreas, setSelectedAreas] = useState<SelectOptions | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<SelectOptions | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<SelectOptions | null>(null);

  const [isAreaSelectOpen, setIsAreaSelectOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);
  const [isWarehouseSelectOpen, setIsWarehouseSelectOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { selectedDelivery } = useStateContext();
  console.log(selectedDelivery);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    setValue,
  } = useForm<CheckoutFormValues>({
    mode: 'onBlur',
    defaultValues: {},
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: CheckoutFormValues) => {
    data.phone = phone;
    console.log(data);
  };

  const handleSelectArea = (value: SelectOptions) => {
    console.log('SelectArea', value);
    setSelectedCity(null);
    setSelectedWarehouse(null);

    setSelectedAreas(value);
  };

  const handleSelectCity = debounce(async (value: SelectOptions) => {
    setInputCity(JSON.stringify(value));

    setSelectedWarehouse(null);
    setSelectedCity(value);
  }, 300);

  const handleSelectWarehouse = (value: SelectOptions) => {
    setSelectedWarehouse(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAreaSelectOpen) {
        setIsLoading(true);
        const areasData = await fetchAreas();
        setIsLoading(false);

        if (areasData) {
          setAreas(areasData);
          setIsAreaSelectOpen(false);
        }
      }
    };
    fetchData();

    const fetchDataCity = async () => {
      if (
        isCitySelectOpen &&
        selectedAreas &&
        !selectedCity &&
        cities.length === 0
      ) {
        setIsLoading(true);
        const citiesData = await fetchCities(selectedAreas.ref, inputCity);
        console.log('citiesData2', citiesData);

        setIsLoading(false);

        if (citiesData) {
          setCities(citiesData);
          console.log('cities', cities);

          setIsCitySelectOpen(false);
        }
      }
    };
    fetchDataCity();

    const fetchDataWarehouse = async () => {
      if (
        isWarehouseSelectOpen &&
        selectedAreas &&
        selectedCity &&
        selectedDelivery
      ) {
        setIsLoading(true);

        const warehouseData = await fetchWarehouses(
          selectedDelivery,
          selectedCity.value
        );

        console.log('selectedCity', selectedCity);
        console.log('selectedCity.ref', selectedCity.ref);

        if (warehouseData) {
          setIsLoading(false);
          setWarehouse(warehouseData);
          setIsWarehouseSelectOpen(false);
        }
      }
    };
    fetchDataWarehouse();
  }, [
    cities,
    inputCity,
    isAreaSelectOpen,
    isCitySelectOpen,
    isWarehouseSelectOpen,
    selectedAreas,
    selectedCity,
    selectedDelivery,
  ]);

  useEffect(() => {
    console.log('cities', cities);
  }, [cities]);

  const selectOptionsArea = areas.map(option => ({
    ref: option.Ref,
    value: option.Description,
    label: option.Description,
  }));

  const selectOptionsCity = cities.map(option => ({
    ref: option.Ref,
    value: option.Description,
    label: option.Description,
  }));

  const selectOptionsWarehouse = warehouse.map(option => ({
    ref: option.Ref,
    value: option.Description,
    label: option.Description,
  }));

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.form__group}>
        <legend className={styles.group__title}>{contactFormTitle}</legend>
        <div className={styles.contactInfo__wrapper}>
          <Input
            label={`${firstName} *`}
            placeholder={firstName}
            id="user_firstName"
            required
            errorMessage={errors.firstName?.message}
            error={errors.firstName}
            {...register('firstName')}
          />
          <Input
            label={`${lastName} *`}
            placeholder={lastName}
            id="user_lastName"
            required
            errorMessage={errors.lastName?.message}
            error={errors.lastName}
            {...register('lastName')}
          />
          <Input
            label={`${email} *`}
            type="email"
            placeholder={email}
            id="user_email"
            required
            errorMessage={errors.email?.message}
            error={errors.email}
            {...register('email')}
          />

          <div>
            <label className={styles.label} htmlFor="phone">
              {phoneNumber}
            </label>
            <PhoneInput
              inputProps={{
                id: 'phone',
              }}
              defaultCountry="ua"
              value={phone}
              showDisabledDialCodeAndPrefix
              disableDialCodeAndPrefix
              className={styles.phoneInput__container}
              onChange={phone => setPhone(phone)}
              placeholder="93-000-00-00"
              onBlur={() => setIsValidPhone(validatePhone(phone))}
            />
            {!isValidPhone && (
              <p className={styles.error}>Phone is not valid</p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.form__group}>
        <legend className={styles.group__title}>Доставка</legend>
        <RadioButtons />
        <div className={styles.contactInfo__wrapper}>
          <CustomSelect
            value={selectedAreas}
            onMenuOpen={() => {
              setIsAreaSelectOpen(true);
            }}
            onChange={value => handleSelectArea(value)}
            options={selectOptionsArea}
            label="Оберіть область доставки *"
            placeholder="Область"
            isLoading={isLoading}
          />
          <CustomSelect
            value={selectedCity}
            onMenuOpen={() => {
              setIsCitySelectOpen(true);
            }}
            onChange={value => handleSelectCity(value)}
            options={selectOptionsCity}
            label="Оберіть ваше місто *"
            placeholder="Місто"
            isLoading={isLoading}
          />
          <CustomSelect
            value={selectedWarehouse}
            onChange={value => handleSelectWarehouse(value)}
            options={selectOptionsWarehouse}
            onMenuOpen={() => {
              setIsWarehouseSelectOpen(true);
            }}
            label="Оберіть номер відділення або поштомату *"
            placeholder="Номер відділення або поштомату"
            isLoading={isLoading}
          />
        </div>
      </fieldset>
      <Button variant="primary" type="submit" className={styles.button}>
        {buttonText}
      </Button>
    </form>
  );
};

export default CheckoutForm;
