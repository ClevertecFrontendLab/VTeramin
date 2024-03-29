import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import styles from '../calendar-drawer.module.css';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormInstance, Input, InputNumber } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeExerciseFormFields, selectCalendarModalData, toggleIsDrawer } from '@redux/calendarModalSlice';
import { drawerFormFields } from '@constants/types';
import { sortDrawerFormFromEmpty } from '@utils/calendar-utils/sort-drawer-form-from-empty';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { selectTraining } from '@redux/trainingSlice';
import { findExercises } from '@utils/calendar-utils/find-exercises';
import { getFixedDate } from '@utils/get-fixed-date';

type props = {
    date: Date
}

export const CalendarDrawerForm: React.FC<props> = ({ date }) => {
    const dispatch = useAppDispatch();
    const training = useAppSelector(selectTraining);
    const { isEdit, selectedTraining, exerciseFormFields } = useAppSelector(selectCalendarModalData);
    const form = useRef<FormInstance<{ exercises: drawerFormFields }>>(null);
    const initialFormValues = {
        exercises: Object.values(exerciseFormFields).length === 0
            ? [{
                name: undefined,
                replays: undefined,
                weight: undefined,
                approaches: undefined
            }]
            : Object.values(exerciseFormFields)
    };

    useEffect(() => {
        if (form.current) form.current.resetFields();
    }, [exerciseFormFields]);

    const fixedDate = getFixedDate(date);
    useEffect(() => {
        const formData = dispatch(findExercises(fixedDate, selectedTraining as string));
        dispatch(changeExerciseFormFields(formData));
    }, [dispatch, isEdit, selectedTraining, training, fixedDate]);

    const [checkboxList, setCheckboxList] = useState<{ [key: number]: boolean }>({});
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    useEffect(() => {
        setIsDeleteDisabled(!Object.values(checkboxList).some(el => el === true));
    }, [checkboxList]);

    function handleCheckboxChange(event: CheckboxChangeEvent, key: number) {
        setCheckboxList(prev => ({
            ...prev,
            [key]: event.target.checked
        }));
    }

    function handleDelete(remove: (index: number | number[]) => void) {
        const checkboxKeys = Object.keys(checkboxList).map(key => Number(key));
        const checkboxTrueList = checkboxKeys.filter(key => checkboxList[key] === true);
        setCheckboxList(prev => {
            const newList = { ...prev };
            checkboxTrueList.forEach(key => {
                delete newList[key];
            });
            return newList;
        });
        remove(checkboxTrueList);
    }

    function onFinish(values: { exercises: drawerFormFields }) {
        dispatch(changeExerciseFormFields(sortDrawerFormFromEmpty(values)));
        dispatch(toggleIsDrawer(false));
    }

    return (
        <Form
            ref={form}
            onFinish={onFinish}
            initialValues={initialFormValues}
        >
            <Form.List name="exercises">
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map(({ name, key }) => (
                                <div key={key}>
                                    <Form.Item name={[name, "name"]} required>
                                        <Input
                                            placeholder="Упражнение"
                                            addonAfter={isEdit && <Checkbox
                                                checked={checkboxList[name]}
                                                onChange={(event) => handleCheckboxChange(event, name)}
                                                name={"checkbox"}
                                                data-test-id={`modal-drawer-right-checkbox-exercise${name}`}
                                            />}
                                            className={styles["drawer__training-name-input"]}
                                            data-test-id={`modal-drawer-right-input-exercise${name}`}
                                        />
                                    </Form.Item>
                                    <div className={styles["drawer__inputs-wrapper"]}>
                                        <Form.Item name={[name, "replays"]} label="Подходы" colon={false}>
                                            <InputNumber
                                                addonBefore="+"
                                                placeholder="1"
                                                min={1}
                                                data-test-id={`modal-drawer-right-input-approach${name}`}
                                            ></InputNumber>
                                        </Form.Item>
                                        <Form.Item name={[name, "weight"]} label="Вес, кг" colon={false}>
                                            <InputNumber
                                                placeholder="0"
                                                min={0}
                                                data-test-id={`modal-drawer-right-input-weight${name}`}
                                            ></InputNumber>
                                        </Form.Item>
                                        <p className={styles["drawer__x"]}>X</p>
                                        <Form.Item name={[name, "approaches"]} label="Количество" colon={false}>
                                            <InputNumber
                                                placeholder="3"
                                                min={1}
                                                data-test-id={`modal-drawer-right-input-quantity${name}`}
                                            ></InputNumber>
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                            {<div className={`${styles["drawer__button-wrapper"]} ${isEdit && styles["edit"]}`}>
                                <Form.Item>
                                    <Button
                                        className={styles["drawer__button"]}
                                        onClick={() => add()}
                                        type="text"
                                        icon={<PlusOutlined />}
                                    >
                                        Добавить ещё
                                    </Button>
                                </Form.Item>
                                {isEdit && <Form.Item>
                                    <Button
                                        className={styles["drawer__button"]}
                                        onClick={() => handleDelete(remove)}
                                        type="text"
                                        icon={<MinusOutlined />}
                                        disabled={isDeleteDisabled}
                                    >
                                        Удалить
                                    </Button>
                                </Form.Item>}
                            </div>}
                        </>
                    )
                }}
            </Form.List>
            <Button
                htmlType="submit"
                type="text"
                className={styles["drawer__close"]}
                id="drawer__close"
                data-test-id="modal-drawer-right-button-close"
            >
                <CloseOutlined />
            </Button>
        </Form>
    );
};
