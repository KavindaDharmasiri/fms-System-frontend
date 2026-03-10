/**
 * @author Kavinda Gimhan
 * @version 1.0.0
 * @since 2025-11-03
 */

// API Base URL
const BASE_URL = '';

// Services
const AUTH_CONTEXT_URL = "/fms-auth-service"
const CORE_CONTEXT_URL = "/fms-core-service"

// Main Request Path Mappings
// Auth Service
const API_AUTH = "/auth";
const API_COMMON = "/api/v1/common";
const API_FIELD_CONFIGURATOR = "/api/v1/field-configurator";
const API_REACTION_TEMPLATE = "/api/v1/reaction-template";
const API_RULE_GROUP = "/api/v1/rule-group";
const API_RULE = "/api/v1/rule";
const API_PAYMENT_NETWORK = "/api/v1/payment-network"
const API_TRANSACTION="/api/v1/tran"
const API_TRANSACTION_VALIDATION="/api/v1/validate-transaction"
const API_DUAL_AUTH="/api/v1/dual-auth"
const API_RISK_CON="/api/v1/risk"

const API_ROLE = "/role"
const API_USER = "/user"
// All Environments
export const environment = {

  ENV_NAME: 'LOCAL',
  YEAR_VERSION: '2025',
  VERSION: '1.0.0',
  PRODUCTION: false,
  API_BASE_URL: BASE_URL,

  // Auth Service Controllers
  AUTH_SERVICE:{
    AUTH:{
      USER_LOGIN:`${BASE_URL+AUTH_CONTEXT_URL+API_AUTH}/login`,
      USER_SIGN_UP:`${BASE_URL+AUTH_CONTEXT_URL+API_AUTH}/signup`,
      USER_LOGOUT:`${BASE_URL+AUTH_CONTEXT_URL}/logout`,
      USER_ME:`${BASE_URL+AUTH_CONTEXT_URL+API_AUTH}/me`,
    },
    ROLE:{
      GET_ALL_ROLE_NAMES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-role-names`,
      GET_ALL_PAGE_NAMES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-page-names`,
      ADD_ROLE:`${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/add-role`,
      GET_ALL_ROLES:`${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-roles`,
      GET_ROLE_BY_ID:`${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-roll-by-id`,
      DELETE_ROLE_BY_ID:`${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/delete-roll-by-id`,
      GET_ALL_PRIVILEGES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-privileges-by-role-id`,
      // GET_ALL_ROLE_NAMES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-role-names`
      UPDATE_PRIVILEGE: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/update-privilege`,
      GET_SECTION_NAMES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-section-names`,
      GET_TASK_NAMES: `${BASE_URL+AUTH_CONTEXT_URL+API_ROLE}/get-all-task-names`
    },
    SYSTEM_USER:{
      ADD_USER:`${BASE_URL+AUTH_CONTEXT_URL+API_USER}/add-system-user`,
      GET_ALL_USERS:`${BASE_URL+AUTH_CONTEXT_URL+API_USER}/get-all-users`,
      GET_USER_BY_ID:`${BASE_URL+AUTH_CONTEXT_URL+API_USER}/get-user-byId`,
      DELETE_USER_BY_ID:`${BASE_URL+AUTH_CONTEXT_URL+API_USER}/delete-by-id`,
    },
    USER:{
      GET_USERS_FOR_SELECTOR:`${BASE_URL+AUTH_CONTEXT_URL+API_USER}/get-all-users-with-username`
    }
  },

  CORE_SERVICE: {
    COMMON: {
      PAYMENT_NETWORKS:`${BASE_URL+CORE_CONTEXT_URL+API_COMMON}/get-payment-networks`,
      // PAYMENT_NETWORKS: `${BASE_URL + CORE_CONTEXT_URL + API_AUTH}/get-payment-networks`,
    },
    FIELD: {
      LOAD_FIELD_CONFIGURATION_TABLE: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/get-table-data?page=`,
      LOAD_FIELD_CONFIGURATOR: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/get-field-configurator?configId=`,
      LOAD_FIELD_CONFIGURATION_By_STATUS: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/get-all-by-status`,
      SAVE_FIELD_CONFIGURATION: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/save-configurator`,
      DELETE_FIELD_DEPENDENCIES: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/delete-field-dependencies?depId=`,
      DELETE_EFMS_ELEMENT: `${BASE_URL + CORE_CONTEXT_URL + API_FIELD_CONFIGURATOR}/delete-fms-element?elemntId=`,
    },
    RULE_GROUP: {
      SAVE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/add-rule-group`,
      UPDATE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/update-rule-group`,
      GET_BY_ID: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/get-rule-group/{id}`,
      FILTER: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/filter-rule-groups`,
      TEST: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/test-rule-group`,
      DELETE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE_GROUP}/delete-rule-group/`,
    },
    RULE: {
      SAVE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/add-rule`,
      UPDATE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/update-rule`,
      GET_BY_ID: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/get-rule/{id}`,
      FILTER: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/filter-rules`,
      DELETE: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/delete-rule/`,
      TEST: `${BASE_URL + CORE_CONTEXT_URL + API_RULE}/test-rule`,
    },
    REACTION_TEMPLATE: {
      LOAD_REACTION_TEMPLATE_TABLE: `${BASE_URL + CORE_CONTEXT_URL + API_REACTION_TEMPLATE}/get-reaction-templates?page=`,
      LOAD_ALL_REACTION_TEMPLATE_TABLE: `${BASE_URL + CORE_CONTEXT_URL + API_REACTION_TEMPLATE}/get-all-reaction-templates`,
      LOAD_REACTION_TEMPLATE_BY_ID: `${BASE_URL + CORE_CONTEXT_URL + API_REACTION_TEMPLATE}/get-reaction-template-byid?temId=`,
      DELETE_REACTION_TEMPLATE_BY_ID: `${BASE_URL + CORE_CONTEXT_URL + API_REACTION_TEMPLATE}/delete-reaction-template-byid?temId=`,
      SAVE_REACTION_TEMPLATE: `${BASE_URL + CORE_CONTEXT_URL + API_REACTION_TEMPLATE}/save-reaction-templates`,
    },
    PAYMENT_NETWORKS: {
      ADD_PAYMENT_NETWORK:`${BASE_URL+CORE_CONTEXT_URL+API_PAYMENT_NETWORK}/add-payment-network`,
      LIST_PAYMENT_NETWORKS:`${BASE_URL+CORE_CONTEXT_URL+API_PAYMENT_NETWORK}/list-payment-networks`,
      GET_PAYMENT_NETWORK_BY_ID:`${BASE_URL+CORE_CONTEXT_URL+API_PAYMENT_NETWORK}/get-payment-network-by-id`,
      PAYMENT_NETWORK_DELETE_PAYMENT_NETWORK_BY_ID:`${BASE_URL+CORE_CONTEXT_URL+API_PAYMENT_NETWORK}/delete-payment-network/`,
    },
    RULE_TESTING_VALIDATION:{
      ADD_TEST_TRANSACTION:`${BASE_URL+CORE_CONTEXT_URL+API_TRANSACTION}/save-tran`
    },
    HIGH_RISK: {
      GET_ALL:`${BASE_URL+CORE_CONTEXT_URL+API_TRANSACTION}/get-all-tran`,
      GET_VARIABLE_NAME:`${BASE_URL+CORE_CONTEXT_URL+API_TRANSACTION}/get-all-vari-names`,
      GET_ALL_STREAM:`${BASE_URL+CORE_CONTEXT_URL+API_TRANSACTION}/transaction/stream`,
    },
    VALIDATE_TRANSACTION:{
      GET_ALL: `${BASE_URL+CORE_CONTEXT_URL+API_TRANSACTION_VALIDATION}/filter`
    },
    DUAL_AUTH: {
      GET_ALL_REQUESTS:`${BASE_URL+CORE_CONTEXT_URL+API_DUAL_AUTH}/get-all`,
      APPROVE_REQUEST:`${BASE_URL+CORE_CONTEXT_URL+API_DUAL_AUTH}/approve-request`,
      REJECT_REQUEST:`${BASE_URL+CORE_CONTEXT_URL+API_DUAL_AUTH}/reject-request`,
      GET_REQUEST_BY_IDENTIFIER:`${BASE_URL+CORE_CONTEXT_URL+API_DUAL_AUTH}/get-request-by-identifier`,
    },
    RISK_REAL_TIME: {
      SET_RULES:`${BASE_URL+CORE_CONTEXT_URL+API_RISK_CON}/set-rule`,
    },
    RISK_MATRIX: {
      GET_ALL:`${BASE_URL+CORE_CONTEXT_URL}/api/v1/risk-matrix/get-all`,
      GET_BY_ID:`${BASE_URL+CORE_CONTEXT_URL}/api/v1/risk-matrix/get-by-id`,
      SAVE:`${BASE_URL+CORE_CONTEXT_URL}/api/v1/risk-matrix/save`,
      UPDATE:`${BASE_URL+CORE_CONTEXT_URL}/api/v1/risk-matrix/update`,
      DELETE:`${BASE_URL+CORE_CONTEXT_URL}/api/v1/risk-matrix/delete`,
    }
  },

  redirectTo: 'https://localhost:4200/for_you',
};

