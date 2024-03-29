export enum calendarModalType {
    default = "default",
    newTraining = "newTraining"
}

export enum badgeColors {
    "Ноги" = "volcano",
    "Силовая" = "yellow",
    "Руки" = "cyan",
    "Грудь" = "green",
    "Спина" = "orange",
    "Кардио" = "pink"
}

export enum valid {
    normal = "normal",
    error = "error",
    success = "success"
}

export enum status {
    empty = "",
    redirect = "redirect",
    noToken = "noToken",
    error = "error",
    success = "success",
    errorFeedback = "errorFeedback",
    successFeedback = "successFeedback",
    errorTrainingList = "errorTrainingList",
    errorSaveTraining = "errorSaveTraining"
}

export enum ROUTE {
    HOME = "/",
    AUTH = "/auth",
    REGISTRATION = "/auth/registration",
    CHANGE_PASSWORD = "/auth/change-password",
    CONFIRM_EMAIL = "/auth/confirm-email",
    MAIN = "/main",
    FEEDBACKS = "/feedbacks",
    CALENDAR = "/calendar",
    RESULT = "/result/:result",
    SUCCESS="/result/success",
    SUCCESS_CHANGE_PASSWORD="/result/success-change-password",
    ERROR="/result/error",
    ERROR_LOGIN="/result/error-login",
    ERROR_USER_EXIST="/result/error-user-exist",
    ERROR_EMAIL_NO_EXIST="/result/error-check-email-no-exist",
    ERROR_CHANGE_PASSWORD="/result/error-change-password",
    ERROR_CHECK_EMAIL="/result/error-check-email"
}
