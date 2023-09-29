import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~ Order Invoice
      </Text>
      <Text style={styles.title}>Order Invoice</Text>
      <Text style={styles.author}>Amitoz Singh</Text>
      <Text style={styles.subtitle}>Order Summary</Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Title</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Price</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Brand</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Color</Text>
          </View>
        </View>

        {order.products.map((p, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{p.product.title}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${p.product.price}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{p.count}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{p.product.brand}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{p.color}</Text>
            </View>
          </View>
        ))}

        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>
              Date:{" "}
              {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>
              OrderId: {order.paymentIntent.id}
            </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>
              Order status: {order.orderStatus}
            </Text>
          </View>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>
              Total Paid: {order.paymentIntent.amount}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.footer}>~ Thankyou for shopping with us ~</Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});
export default Invoice;
