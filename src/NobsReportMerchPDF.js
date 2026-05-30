import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'
import { MERCH_ITEMS, INVESTITURE_ITEMS, rowTotal, invRowTotal, grandTotal, formatSizes } from './NobsReportMerch'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const s = StyleSheet.create({
  page: { fontFamily: 'Open Sans', fontSize: 8, padding: '10mm 12mm' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 10 },
  logo: { width: 36, height: 36 },
  title: { fontSize: 14, fontWeight: 'bold' },
  version: { fontSize: 6, color: '#888', marginBottom: 2 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 8 },
  bold: { fontWeight: 'bold' },
  row: { flexDirection: 'row' },
  cell: { borderWidth: 0.5, borderColor: '#aaa', padding: '2 3' },
  hCell: { fontWeight: 'bold', backgroundColor: '#f0f0f0' },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', marginTop: 10, marginBottom: 3 },
  hint: { fontSize: 7, color: '#666', marginBottom: 4 },
  // merch table column widths
  mItem: { width: '36%' },
  mPrice: { width: '6%', textAlign: 'right' },
  mCount: { width: '6%', textAlign: 'right' },
  mSizes: { width: '24%' },
  mCash: { width: '8%', textAlign: 'right' },
  mEft: { width: '8%', textAlign: 'right' },
  mTotal: { width: '12%', textAlign: 'right' },
  // investiture table column widths
  iItem: { width: '38%' },
  iPrice: { width: '10%', textAlign: 'right' },
  iCrew: { width: '10%', textAlign: 'center' },
  iTotal: { width: '22%', textAlign: 'right' },
})

export function MerchDocument({ week, year, fields, logoUrl }) {
  const { name = '', items = {}, investiture = {}, donations = '' } = fields
  const total = grandTotal(fields)

  return (
    <Document>
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>Last Updated March 2026</Text>
            <Text style={s.title}>Merchandise Sales Record</Text>
          </View>
        </View>

        <View style={s.metaRow}>
          <Text>
            <Text style={s.bold}>Week: </Text>
            {week}
          </Text>
          <Text>
            <Text style={s.bold}>Year: </Text>
            {year}
          </Text>
          <Text>
            <Text style={s.bold}>PA Name: </Text>
            {name}
          </Text>
        </View>

        {/* Merch table */}
        <View style={s.row}>
          {[
            [s.mItem, 'Item'],
            [s.mPrice, 'Price'],
            [s.mCount, '# Sold'],
            [s.mSizes, 'Sizes sold'],
            [s.mCash, 'Cash $'],
            [s.mEft, 'EFT $'],
            [s.mTotal, 'Total'],
          ].map(([col, label]) => (
            <View key={label} style={[s.cell, s.hCell, col]}>
              <Text>{label}</Text>
            </View>
          ))}
        </View>

        {MERCH_ITEMS.map(({ key, label, price }) => {
          const row = items[key] || {}
          const t = rowTotal(row)
          return (
            <View key={key} style={s.row}>
              <View style={[s.cell, s.mItem]}>
                <Text>{label}</Text>
              </View>
              <View style={[s.cell, s.mPrice]}>
                <Text>${price}</Text>
              </View>
              <View style={[s.cell, s.mCount]}>
                <Text>{row.count || ''}</Text>
              </View>
              <View style={[s.cell, s.mSizes]}>
                <Text>{formatSizes(row.sizes)}</Text>
              </View>
              <View style={[s.cell, s.mCash]}>
                <Text>{row.cash || ''}</Text>
              </View>
              <View style={[s.cell, s.mEft]}>
                <Text>{row.eft || ''}</Text>
              </View>
              <View style={[s.cell, s.mTotal]}>
                <Text>{t > 0 ? `$${t}` : ''}</Text>
              </View>
            </View>
          )
        })}

        {/* Investiture section */}
        <Text style={s.sectionTitle}>Investitures</Text>
        <Text style={s.hint}>*Scarf badges are sold separately from scarves. Replacement items must be paid for.</Text>

        <View style={s.row}>
          {[
            [s.iItem, 'Item'],
            [s.iPrice, 'Price'],
            [s.iCrew, 'AVU'],
            [s.iCrew, 'ARC'],
            [s.iCrew, 'BRC'],
            [s.iTotal, 'Total'],
          ].map(([col, label], i) => (
            <View key={i} style={[s.cell, s.hCell, col]}>
              <Text>{label}</Text>
            </View>
          ))}
        </View>

        {INVESTITURE_ITEMS.map(({ key, label, price }) => {
          const row = investiture[key] || {}
          const t = invRowTotal(row, price)
          return (
            <View key={key} style={s.row}>
              <View style={[s.cell, s.iItem]}>
                <Text>{label}</Text>
              </View>
              <View style={[s.cell, s.iPrice]}>
                <Text>{price != null ? `$${price}` : ''}</Text>
              </View>
              <View style={[s.cell, s.iCrew]}>
                <Text>{row.avu || ''}</Text>
              </View>
              <View style={[s.cell, s.iCrew]}>
                <Text>{row.arc || ''}</Text>
              </View>
              <View style={[s.cell, s.iCrew]}>
                <Text>{row.brc || ''}</Text>
              </View>
              <View style={[s.cell, s.iTotal]}>
                <Text>{t > 0 ? `$${t}` : ''}</Text>
              </View>
            </View>
          )
        })}

        {/* Donations */}
        <View style={s.row}>
          <View style={[s.cell, { width: '48%' }]}>
            <Text>Donations</Text>
          </View>
          <View style={[s.cell, { width: '32%' }]}>
            <Text></Text>
          </View>
          <View style={[s.cell, s.iTotal]}>
            <Text>{donations ? `$${parseFloat(donations).toFixed(0)}` : ''}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 6 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 11 }}>Total Sales: ${total.toFixed(0)}</Text>
        </View>

        {/* Bank details */}
        <View style={{ marginTop: 10, padding: 6, backgroundColor: '#f5f5f5' }}>
          <Text style={{ marginBottom: 2 }}>
            All sales (cash and/or EFT) to be sent in 1 transaction within 30 days of the event's conclusion.
          </Text>
          <Text>
            <Text style={s.bold}>Account Name: </Text>Bogong Operating Account
          </Text>
          <Text>
            <Text style={s.bold}>BSB: </Text>633 000{'   '}
            <Text style={s.bold}>Account Number: </Text>133 498 345
          </Text>
          <Text>
            <Text style={s.bold}>Reference: </Text>Merch {week}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
