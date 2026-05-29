import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const s = StyleSheet.create({
  page: { fontFamily: 'Open Sans', fontSize: 10, padding: '12mm 16mm' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  logo: { width: 60, height: 60 },
  version: { fontSize: 8, marginBottom: 3 },
  title: { fontSize: 22, fontWeight: 'bold', lineHeight: 1.15 },
  metaRow: { flexDirection: 'row', gap: 32, marginBottom: 5 },
  nameRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 12,
  },
  bold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 3, marginTop: 10 },
  subTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: 3, marginTop: 6 },
  hint: { fontSize: 8, fontStyle: 'italic', marginBottom: 5 },
  contentBox: { marginBottom: 8 },
  tableRow: { flexDirection: 'row' },
  cell: { borderWidth: 0.5, borderColor: '#aaa', padding: '2 4', fontSize: 9 },
  cellBg: { backgroundColor: '#f0f0f0' },
  footer: { fontSize: 8, color: '#aaa', textAlign: 'center', marginTop: 16 },
})

function GenTable({ prefix, fields }) {
  const v = (key) => fields[key] ?? ''
  return (
    <View style={{ marginBottom: 8 }}>
      <View style={s.tableRow}>
        <View style={[s.cell, s.cellBg, { width: '45%' }]}>
          <Text style={s.bold}>Generators</Text>
        </View>
        <View style={[s.cell, s.cellBg, { width: '20%' }]}>
          <Text></Text>
        </View>
        <View style={[s.cell, s.cellBg, { width: '35%' }]}>
          <Text style={s.bold}>Fuel Levels</Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, s.cellBg, { width: '65%' }]}>
          <Text style={s.bold}>Lister</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text style={s.bold}>Generator Tank</Text>
          <Text>Litres: {v(`${prefix}ListerFuel`)}</Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, { width: '45%' }]}>
          <Text>Resettable Hours</Text>
        </View>
        <View style={[s.cell, { width: '20%' }]}>
          <Text>{v(`${prefix}ListerResettable`)}</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text> </Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, { width: '45%' }]}>
          <Text>Total Hours</Text>
        </View>
        <View style={[s.cell, { width: '20%' }]}>
          <Text>{v(`${prefix}ListerTotal`)}</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text> </Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, s.cellBg, { width: '65%' }]}>
          <Text style={s.bold}>Petter</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text style={s.bold}>Drying Room Tank</Text>
          <Text>Litres: {v(`${prefix}PetterFuel`)}</Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, { width: '45%' }]}>
          <Text>Resettable Hours</Text>
        </View>
        <View style={[s.cell, { width: '20%' }]}>
          <Text>{v(`${prefix}PetterResettable`)}</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text> </Text>
        </View>
      </View>
      <View style={s.tableRow}>
        <View style={[s.cell, { width: '45%' }]}>
          <Text>Total Hours</Text>
        </View>
        <View style={[s.cell, { width: '20%' }]}>
          <Text>{v(`${prefix}PetterTotal`)}</Text>
        </View>
        <View style={[s.cell, { width: '35%' }]}>
          <Text> </Text>
        </View>
      </View>
    </View>
  )
}

export function CEDocument({ week, year, fields, logoUrl }) {
  const v = (key) => fields[key] ?? ''
  return (
    <Document>
      {/* Page 1: header, generators, breakages */}
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>2026 version</Text>
            <Text style={s.title}>Chief Engineer{'\n'}Report</Text>
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
        </View>
        <View style={s.nameRow}>
          <Text style={s.bold}>Name of Chief Engineer:{'  '}</Text>
          <Text>{v('name')}</Text>
        </View>

        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Generators / Electrical System</Text>
        <Text style={s.hint}>– Issues/maintenance done – Fill in hours run per generator – Fuel levels.</Text>

        <Text style={s.subTitle}>Start of week</Text>
        <GenTable prefix='start' fields={fields} />

        <Text style={s.subTitle}>End of week</Text>
        <GenTable prefix='end' fields={fields} />

        <View style={{ marginTop: 6, marginBottom: 6 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 3 }}>
            At end of week, if there is:
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 2 }}>
            <Text style={{ width: 10, fontSize: 9 }}>•</Text>
            <View>
              <Text style={{ fontSize: 9, fontWeight: 'bold', textDecoration: 'underline' }}>No incoming week</Text>
              <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                <Text style={{ width: 10, fontSize: 9 }}>◦</Text>
                <Text style={{ fontSize: 9, fontWeight: 'bold', textDecoration: 'underline' }}>
                  "TURN OFF" Diesel Taps
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                <Text style={{ width: 10, fontSize: 9 }}>◦</Text>
                <Text style={{ fontSize: 9, textDecoration: 'underline' }}>
                  Follow shutdown instruction in operation manual
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ width: 10, fontSize: 9 }}>•</Text>
            <View>
              <Text style={{ fontSize: 9, fontWeight: 'bold', textDecoration: 'underline' }}>
                There is an incoming week
              </Text>
              <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                <Text style={{ width: 10, fontSize: 9 }}>◦</Text>
                <Text style={{ fontSize: 9, textDecoration: 'underline' }}>Leave "Diesel Tap 4 On"</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <Text style={{ fontSize: 10 }}>{v('logbookCompleted') ? '☑' : '☐'}</Text>
          <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Generator Logbook Completed</Text>
        </View>

        <Text style={s.sectionTitle}>Breakages & Fixes</Text>
        <Text style={s.hint}>Did you fix anything? Did anything break that you didn't fix?</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('breakagesFixes')}</Text>
        </View>

        <Text style={s.footer}>Don't be afraid to make a phone call</Text>
      </Page>

      {/* Page 2: Theodore, Water, Gas, Sewerage, Tow, Food Scrap Bins */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Theodore</Text>
        <Text style={s.hint}>– Issues.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('theodore')}</Text>
        </View>

        <Text style={s.sectionTitle}>Water Supply</Text>
        <Text style={s.hint}>– Issues/maintenance done – Clarity.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('waterSupply')}</Text>
        </View>

        <Text style={s.sectionTitle}>Gas Supply</Text>
        <Text style={s.hint}>– Issues – Which bottle/s did you use / did you swap bottles e.g. 1-2, 4-5 etc.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('gasSupply')}</Text>
        </View>

        <Text style={s.sectionTitle}>Sewerage</Text>
        <Text style={s.hint}>– Issues – Any issues or blockages.</Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('sewerage')}</Text>
        </View>

        <Text style={s.sectionTitle}>Tow</Text>
        <Text style={{ fontSize: 9, marginBottom: 12 }}>Make sure the Tow Leader has completed their report.</Text>

        <Text style={s.sectionTitle}>Food Scrap Bins</Text>
        <Text style={s.hint}>– How many bins are in use – Food scrap levels %. (Beginning AND end of the week).</Text>
        <Text style={s.hint}>– Odd number week, use odd number bin; Even number week, use even number bin.</Text>
        <Text style={[s.hint, { fontWeight: 'bold', textDecoration: 'underline' }]}>
          – Make sure you monitor the food scrap bin levels and drain them on Mondays & Thursdays.
        </Text>

        <View style={s.tableRow}>
          <View style={[s.cell, s.cellBg, { width: '20%' }]}>
            <Text></Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '40%' }]}>
            <Text style={s.bold}>Beginning of week</Text>
          </View>
          <View style={[s.cell, s.cellBg, { width: '40%' }]}>
            <Text style={s.bold}>End of week</Text>
          </View>
        </View>
        {[1, 2, 3].map((bin) => (
          <View key={bin} style={s.tableRow}>
            <View style={[s.cell, { width: '20%' }]}>
              <Text style={s.bold}>Bin {bin}</Text>
            </View>
            <View style={[s.cell, { width: '40%' }]}>
              <Text>{v(`bin${bin}Start`)}</Text>
            </View>
            <View style={[s.cell, { width: '40%' }]}>
              <Text>{v(`bin${bin}End`)}</Text>
            </View>
          </View>
        ))}

        <Text style={s.footer}>Don't be afraid to make a phone call</Text>
      </Page>

      {/* Page 3: Chalet Equipment */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Chalet Equipment</Text>
        <Text style={s.hint}>
          How many axe handles have been broken this week? Any broken Radios? Any antennas missing? Any other damaged
          equipment?
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('chaletEquipment')}</Text>
        </View>

        <Text style={{ fontSize: 9, marginBottom: 8 }}>
          Any other structures / items requiring repair or replacement next summer?
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('otherStructures')}</Text>
        </View>

        <Text style={{ fontSize: 9, fontWeight: 'bold', marginTop: 16 }}>
          IMPORTANT – You are responsible for the information contained in this report. You may be required to elaborate
          upon it at length at a later date.
        </Text>

        <Text style={s.footer}>Don't be afraid to make a phone call</Text>
      </Page>
    </Document>
  )
}
