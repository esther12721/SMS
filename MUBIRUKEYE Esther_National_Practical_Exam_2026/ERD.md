# Entity Relationship Diagram – SMS

```
┌─────────────────────┐         ┌──────────────────────────┐         ┌──────────────────────┐
│      PRODUCT        │         │   STOCK_TRANSACTION      │         │     WAREHOUSE        │
├─────────────────────┤         ├──────────────────────────┤         ├──────────────────────┤
│ PK productCode      │1───────<│ PK transactionId         │>───────1│ PK warehouseCode     │
│    productName      │         │ FK productCode           │         │    warehouseName     │
│    category         │         │ FK warehouseCode         │         │    warehouseLocation │
│    quantityInStock  │         │    transactionDate       │         └──────────────────────┘
│    unitPrice        │         │    quantityMoved         │
│    supplierName     │         │    transactionType (IN/OUT)│
│    dateReceived     │         └──────────────────────────┘
└─────────────────────┘
```

## Relationships & Cardinalities
- **Product (1) — (M) StockTransaction**: one product can appear in many transactions.
- **Warehouse (1) — (M) StockTransaction**: one warehouse hosts many transactions.

## Keys
- Product PK: `productCode`
- Warehouse PK: `warehouseCode`
- StockTransaction PK: `transactionId` (auto), FKs: `productCode`, `warehouseCode`
