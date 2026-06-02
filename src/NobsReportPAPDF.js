import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const DAYS = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const EXIT_ABBR = ['Hist.', 'Pigmy', 'Games', 'Kitch.', 'Balc.']

function isEsmChecked(esmPaths, dayIdx, period, exitIdx) {
  return !!esmPaths?.[`${dayIdx}-${period}-${exitIdx}`]
}

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
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 4, marginTop: 8 },
  hint: { fontSize: 8, marginBottom: 6 },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  bullet: { width: 12 },
  contentBox: { marginBottom: 8 },
  // Table styles
  tableRow: { flexDirection: 'row' },
  cell: { borderWidth: 0.5, borderColor: '#aaa', padding: '2 4', fontSize: 9 },
  headerCell: { fontWeight: 'bold', backgroundColor: '#f0f0f0' },
  dayCol: { width: '22%' },
  exitCol: { width: '15.6%' },
  nameCol: { width: '70%' },
  crewCol: { width: '30%' },
  legend: { fontSize: 8, color: '#555', marginTop: 4 },
})

const BULLET_PROMPTS = [
  'Identify future Nobs',
  'Critically reflect on the performance of the Nobs (if necessary report directly to the Wardens)',
  'Major issues requiring BCMG discussion',
  'Safety concerns or concerns with participants',
  'List of Invested attendees',
  'Sales of merchandise (including all sizes)',
  'ESM matters & feedback (e.g. snow clearing from emergency exits)',
]

export function PADocument({ week, year, fields, logoUrl }) {
  const { name = '', report = '', esmPaths = {}, investiture = [], investedBy = '', investitureDate = '' } = fields

  return (
    <Document>
      {/* Page 1: report */}
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>2026 version</Text>
            <Text style={s.title}>Party Advisor{'\n'}Report</Text>
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
          <Text style={s.bold}>Name of Party Advisor:{'  '}</Text>
          <Text>{name}</Text>
        </View>

        <Text style={s.sectionTitle}>Report</Text>
        <Text style={{ fontSize: 9, marginBottom: 4 }}>Your report could touch on any of the following:</Text>
        {BULLET_PROMPTS.map((p) => (
          <View key={p} style={s.bulletRow}>
            <Text style={s.bullet}>•</Text>
            <Text style={{ fontSize: 8, flex: 1 }}>{p}</Text>
          </View>
        ))}
        <View style={[s.contentBox, { marginTop: 6 }]}>
          <Text style={{ fontSize: 10 }}>{report}</Text>
        </View>
      </Page>

      {/* Page 2: ESM exit paths */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0 }]}>ESM Exit Paths</Text>
        <Text style={s.hint}>Check each exit twice daily to confirm it was clear of snow and other obstructions.</Text>

        <View style={s.tableRow}>
          <View style={[s.cell, s.headerCell, s.dayCol]}>
            <Text></Text>
          </View>
          {EXIT_ABBR.map((e) => (
            <View key={e} style={[s.cell, s.headerCell, s.exitCol, { textAlign: 'center' }]}>
              <Text>{e}</Text>
            </View>
          ))}
        </View>
        {DAYS.map((day, dayIdx) =>
          ['am', 'pm'].map((period) => (
            <View key={`${dayIdx}-${period}`} style={s.tableRow}>
              <View style={[s.cell, s.dayCol]}>
                <Text>
                  {period === 'am' ? day : ''} {period.toUpperCase()}
                </Text>
              </View>
              {[0, 1, 2, 3, 4].map((exitIdx) => (
                <View key={exitIdx} style={[s.cell, s.exitCol, { alignItems: 'center' }]}>
                  <Text>{isEsmChecked(esmPaths, dayIdx, period, exitIdx) ? '✓' : ' '}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </Page>

      {/* Page 3: Investiture list */}
      <Page size='A4' style={s.page}>
        <Text style={[s.sectionTitle, { marginTop: 0, fontSize: 18 }]}>Investiture List</Text>

        <View style={{ flexDirection: 'row', gap: 24, marginBottom: 8 }}>
          <Text>
            <Text style={s.bold}>Date: </Text>
            {investitureDate}
          </Text>
          <Text>
            <Text style={s.bold}>Invested by: </Text>
            {investedBy}
          </Text>
        </View>

        <View style={s.tableRow}>
          <View style={[s.cell, s.headerCell, s.nameCol]}>
            <Text>Name</Text>
          </View>
          <View style={[s.cell, s.headerCell, s.crewCol]}>
            <Text>Crew</Text>
          </View>
        </View>
        {investiture.length > 0
          ? investiture.map((row, i) => (
              <View key={i} style={s.tableRow}>
                <View style={[s.cell, s.nameCol]}>
                  <Text>{row.name}</Text>
                </View>
                <View style={[s.cell, s.crewCol]}>
                  <Text>{row.crew}</Text>
                </View>
              </View>
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <View key={i} style={s.tableRow}>
                <View style={[s.cell, s.nameCol]}>
                  <Text> </Text>
                </View>
                <View style={[s.cell, s.crewCol]}>
                  <Text> </Text>
                </View>
              </View>
            ))}

        <Text style={s.legend}>AVC = Alpine Venturer Crew · ARC = Alpine Rover Crew · BRC = Bogong Rover Crew</Text>
      </Page>
    </Document>
  )
}
