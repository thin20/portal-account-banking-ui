<template>
  <div>
    <a-row justify="center">
      <a-col :span="20" :offset="2">
        <h1 class="title-list-user-account">TOTAL: {{ total }}</h1>
        <router-link to="/formAddUserAccount" class="btn-add-user-account">
          Add User Account
        </router-link>
        <a-table
          ref="TableUserAccount"
          :columns="columns"
          :data-source="data"
          :pagination="data.length === 0 ? false : pagination"
          @change="handleTableChange"
          bordered
        >
          <template
            v-for="col in ['name', 'idRole', 'phone', 'country']"
            :slot="col"
            slot-scope="text"
          >
            <div :key="col">
              <template>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span>
                <router-link :to="'/formUpdateUserAccount/' + record.key"
                  >Edit</router-link
                >&nbsp;
                <a @click="handleDeleteUserAccount(record.key)">Delete</a>
              </span>
            </div>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "idRole",
    dataIndex: "idRole",
    width: "15%",
    scopedSlots: { customRender: "idRole" },
  },
  {
    title: "phone",
    dataIndex: "phone",
    width: "20%",
    scopedSlots: { customRender: "phone" },
  },
  {
    title: "country",
    dataIndex: "country",
    width: "20%",
    scopedSlots: { customRender: "country" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

import { mapActions, mapGetters } from "vuex";
import { DeleteUserAccount } from "@/api/UserAccount";

export default {
  data() {
    return {
      columns,
      data: [],
      page: 1,
      // total: 1,
      pagination: {
        current: 1,
        total: this.total,
        pageSize: 3,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["15", "25", "50"],
        showTotal: (total) => {
          return "Tổng số dòng " + total;
        },
      },
    };
  },
  methods: {
    ...mapActions[
      ("userAccount/getListUserAccount", "userAccount/getAlUserAccount")
    ],
    ...mapGetters["auth/loggedIn"],
    getListUserAccount(page, limit) {
      let _this = this;
      let result = [];
      this.$store
        .dispatch("userAccount/getListUserAccount", {
          page,
          limit,
        })
        .then((res) => {
          _this.pagination.total =
            _this.$store.getters["userAccount/GetTotalUserAccount"];
          result = res.forEach((item) => {
            result.push({
              key: item.id,
              name: item.name,
              idRole: item.idRole,
              phone: item.phone,
              country: item.country,
            });
          });
        });
      return result;
    },
    getAllUserAccount() {
      let _this = this;
      let result = [];
      this.$store.dispatch("userAccount/getAllUserAccount").then((res) => {
        _this.pagination.total =
          _this.$store.getters["userAccount/GetTotalUserAccount"];
        result = res.forEach((item) => {
          result.push({
            key: item.id,
            name: item.name,
            idRole: item.idRole,
            phone: item.phone,
            country: item.country,
          });
        });
      });
      return result;
    },
    handleTableChange(pagination) {
      this.pagination = {
        ...pagination,
        total: this.$store.getters["userAccount/GetTotalUserAccount"],
      };
      console.log("Table change: ", this.pagination);
      this.data = this.getListUserAccount(
        this.pagination.current,
        this.pagination.pageSize
      );
    },
    handleDeleteUserAccount(idUser) {
      console.log("Id user delete: ", idUser);
      DeleteUserAccount(
        { id: idUser },
        this.$store.state.auth?.currentUser?.id
          ? this.$store.state.auth.currentUser.id
          : -1
      ).then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          this.data = this.getListUserAccount(
            this.page,
            this.pagination.pageSize
          );
          this.pagination = { ...this.pagination, current: this.page };
        } else {
          if (!this.$store.state.auth.currentUser) {
            this.$router.push({ name: "Login" });
          } else if (this.$store.state.auth.currentUser.idRole) {
            this.$message.error("You not have permision to delete");
          }
        }
      });
    },
  },
  computed: {
    total() {
      return this.$store.state.userAccount.total;
    },
  },
  created() {
    // console.log("Pagination: ", this.pagination.pageSize);
    this.data = this.getListUserAccount(this.page, this.pagination.pageSize);
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.title-list-user-account {
  padding-top: 20px;
  text-align: center;
}
.btn-add-user-account {
  display: block;
  margin-bottom: 20px;
  padding: 8px 15px;
  width: 180px;

  cursor: pointer;
  border: transparent;
  border-radius: 4px;
  text-align: center;

  background-color: rgb(3, 132, 255);
  color: #fff;
}
.btn-add-user-account:hover {
  opacity: 0.8;
}
</style>
