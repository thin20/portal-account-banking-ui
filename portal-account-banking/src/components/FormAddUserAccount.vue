<template>
  <div class="form-register">
    <h1 class="title-register">Add User Account</h1>
    <a-row type="flex" justify="center">
      <a-col :span="8">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="UserName">
            <a-input
              v-decorator="[
                'username',
                {
                  rules: [
                    { required: true, message: 'Please input your username!' },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="Confirm Password"
            has-feedback
          >
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Role">
            <a-cascader
              v-decorator="[
                'role',
                {
                  initialValue: ['normal'],
                  rules: [
                    {
                      type: 'array',
                      required: true,
                      message: 'Please select Role of user!',
                    },
                  ],
                },
              ]"
              :options="listRole"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              Nickname&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input
              v-decorator="[
                'nickname',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your nickname!',
                      whitespace: true,
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Country">
            <vue-country-code
              @onSelect="onSelect"
              :preferredCountries="['vn', 'us', 'gb']"
              style="width: 100px"
            >
            </vue-country-code>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Phone Number">
            <a-input
              type="number"
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ],
                },
              ]"
              style="width: 100%"
            >
            </a-input>
          </a-form-item>

          <a-form-item v-bind="tailFormItemLayout">
            <a-checkbox
              v-decorator="['agreement', { valuePropName: 'checked' }]"
            >
              I have read the
              <a href=""> agreement </a>
            </a-checkbox>
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit" :loading="this.loading">
              Add
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      confirmDirty: false,
      country: "",
      autoCompleteResult: [],
      loading: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "create" });
  },
  methods: {
    ...mapActions["role/getListRole"],
    onSelect({ name }) {
      this.country = name;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true;
          values = { ...values, country: this.country, idRole: values.role[0] };
          console.log("Received values of form: ", values);
          let userInfo = {
            userName: values.username,
            password: values.password,
            phone: values.phone,
            idRole: values.idRole,
            country: values.country,
            name: values.nickname,
          };
          // call api register
          let statusRegister = this.$store.dispatch(
            "userAccount/createUserAccount",
            {
              userInfo,
              currentUserId: this.$store.state.auth?.currentUser?.id
                ? this.$store.state.auth.currentUser.id
                : -1,
            }
          );
          statusRegister.then((res) => {
            if (res) {
              this.$message.success("Add user account successfull!");
              this.$router.push({ name: "Home" });
            } else {
              console.log(this.form);
              this.form.validateFields(["username"], { force: true });
              this.form.resetFields();
              this.$message.error("Username is already exits!");
            }
            this.loading = false;
          });
          this.loading = false;
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
  computed: {
    listRole() {
      return this.$store.getters["role/GetListOptionRole"];
    },
  },
  created() {
    this.$store.dispatch("role/getListRole");
  },
};
</script>

<style>
.title-register {
  text-align: center;
  margin: 40px 0;
}
</style>
