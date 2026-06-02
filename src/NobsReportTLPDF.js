import React from 'react'
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansBold from 'npm-font-open-sans/fonts/Bold/OpenSans-Bold.ttf'

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansBold, fontWeight: 'bold' }] })

const DAYS = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']
const DAY_LABELS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const START_CHECKS = [
  { key: 'followStartup', label: 'Follow startup checklist' },
  { key: 'sheaths', label: 'Sheaths approximately 1m above snow' },
  { key: 'ropeOffHook', label: 'Rope off hook and sitting on all wheels' },
  { key: 'ropeTensioned', label: 'Rope tensioned' },
  { key: 'ropeEntry', label: 'Rope entry to tow hut clear of snow and ice' },
  { key: 'oilLevel', label: 'Oil level checked' },
  { key: 'coolantLevel', label: 'Coolant level checked' },
  { key: 'fuelLevel', label: 'Fuel level checked' },
  { key: 'fuelTap', label: 'Fuel tap open' },
  { key: 'eStops', label: 'E-Stops and safety gate tested and reset (x5)' },
  { key: 'towHutTidy', label: 'Tow hut tidy' },
]

const END_CHECKS = [
  { key: 'followShutdown', label: 'Follow shutdown checklist' },
  { key: 'fuelTapClosed', label: 'Fuel tap closed' },
  { key: 'masterKeyOff', label: 'Control panel master key off' },
  { key: 'batteryIsolators', label: 'Battery isolators off' },
  { key: 'ropeHooked', label: 'Rope hooked above road' },
]

const s = StyleSheet.create({
  page: { fontFamily: 'Open Sans', fontSize: 9, padding: '12mm 14mm' },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 12 },
  logo: { width: 56, height: 56 },
  version: { fontSize: 8, marginBottom: 3 },
  title: { fontSize: 20, fontWeight: 'bold', lineHeight: 1.15 },
  metaRow: { flexDirection: 'row', gap: 32, marginBottom: 5 },
  nameRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 10,
  },
  bold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 10 },
  tableRow: { flexDirection: 'row' },
  cell: { borderWidth: 0.5, borderColor: '#aaa', padding: '2 3', fontSize: 8 },
  cellBg: { backgroundColor: '#f0f0f0' },
  labelCol: { width: '42%' },
  dayCol: { width: `${58 / 7}%` },
  contentBox: { marginBottom: 8 },
})

function CheckTable({ title, checks, checksData, initialsData, extraRows }) {
  return (
    <View>
      <Text style={s.sectionTitle}>{title}</Text>
      {/* Header */}
      <View style={s.tableRow}>
        <View style={[s.cell, s.cellBg, s.labelCol]}>
          <Text></Text>
        </View>
        {DAY_LABELS.map((d) => (
          <View key={d} style={[s.cell, s.cellBg, s.dayCol, { alignItems: 'center' }]}>
            <Text style={s.bold}>{d}</Text>
          </View>
        ))}
      </View>
      {/* Check rows */}
      {checks.map(({ key, label }) => (
        <View key={key} style={s.tableRow}>
          <View style={[s.cell, s.labelCol]}>
            <Text>{label}</Text>
          </View>
          {DAYS.map((day) => (
            <View key={day} style={[s.cell, s.dayCol, { alignItems: 'center' }]}>
              <Text>{checksData?.[`${day}_${key}`] ? '✓' : ' '}</Text>
            </View>
          ))}
        </View>
      ))}
      {/* Extra rows (hour meter etc) */}
      {extraRows}
      {/* Initials row */}
      <View style={s.tableRow}>
        <View style={[s.cell, s.labelCol, s.cellBg]}>
          <Text style={s.bold}>Initials of Designated Tow Operator</Text>
        </View>
        {DAYS.map((day) => (
          <View key={day} style={[s.cell, s.dayCol, { alignItems: 'center' }]}>
            <Text>{initialsData?.[day] ?? ''}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export function TLDocument({ week, year, fields, logoUrl }) {
  const v = (key) => fields[key] ?? ''

  const hourMeterRow = (
    <View style={s.tableRow}>
      <View style={[s.cell, s.labelCol]}>
        <Text>Hour meter reading (total system time)</Text>
      </View>
      {DAYS.map((day) => (
        <View key={day} style={[s.cell, s.dayCol, { alignItems: 'center' }]}>
          <Text>{fields.hourMeter?.[day] ?? ''}</Text>
        </View>
      ))}
    </View>
  )

  return (
    <Document>
      {/* Page 1: header, weekly totals, start of day checks */}
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <Image src={logoUrl} style={s.logo} />
          <View>
            <Text style={s.version}>2026 version</Text>
            <Text style={s.title}>Tow Leader{'\n'}Report</Text>
          </View>
        </View>

        <Text style={{ fontSize: 8, fontStyle: 'italic', marginBottom: 6 }}>
          Copy details from the tow hut logbook.
        </Text>

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
          <Text style={s.bold}>Tow Leader:{'  '}</Text>
          <Text>{v('towLeader')}</Text>
        </View>

        <Text style={[s.sectionTitle, { marginTop: 0 }]}>Weekly totals</Text>
        {[
          { key: 'fuelAdded', label: 'Fuel added to fuel tank' },
          { key: 'oilAdded', label: 'Oil added to sump' },
          { key: 'coolantAdded', label: 'Coolant added to radiator' },
          { key: 'totalRunningHours', label: 'Total running hours for the week' },
        ].map(({ key, label }) => (
          <View key={key} style={s.tableRow}>
            <View style={[s.cell, { width: '70%' }]}>
              <Text>{label}</Text>
            </View>
            <View style={[s.cell, { width: '30%' }]}>
              <Text>{v(key)}</Text>
            </View>
          </View>
        ))}

        <CheckTable
          title='Start of day checks'
          checks={START_CHECKS}
          checksData={fields.startChecks}
          initialsData={fields.startInitials}
          extraRows={null}
        />
      </Page>

      {/* Page 2: end of day checks, issues, tow operators */}
      <Page size='A4' style={s.page}>
        <CheckTable
          title='End of day checks'
          checks={END_CHECKS}
          checksData={fields.endChecks}
          initialsData={fields.endInitials}
          extraRows={hourMeterRow}
        />

        <Text style={s.sectionTitle}>Issues & comments</Text>
        <Text style={{ fontSize: 8, fontStyle: 'italic', marginBottom: 4 }}>
          Issues, comments, list of designated Tow Operators, date and time of Tow Trained User briefing.
        </Text>
        <View style={s.contentBox}>
          <Text style={{ fontSize: 9 }}>{v('issues')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 }}>
          <Text style={{ fontSize: 10 }}>{v('incidentReports') ? '☑' : '☐'}</Text>
          <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Have you completed your incident reports?</Text>
        </View>

        <Text style={s.sectionTitle}>Designated Tow Operators</Text>
        {fields.towUsers?.length > 0 ? (
          <>
            <View style={s.tableRow}>
              <View style={[s.cell, s.cellBg, { width: '8%' }]}>
                <Text style={s.bold}>#</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '45%' }]}>
                <Text style={s.bold}>Name</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '22%', textAlign: 'center' }]}>
                <Text style={s.bold}>Training Provided</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '25%' }]}>
                <Text style={s.bold}>Other</Text>
              </View>
            </View>
            {fields.towUsers.map((row, idx) => (
              <View key={idx} style={s.tableRow}>
                <View style={[s.cell, { width: '8%' }]}>
                  <Text>{idx + 1}</Text>
                </View>
                <View style={[s.cell, { width: '45%' }]}>
                  <Text>{row.name}</Text>
                </View>
                <View style={[s.cell, { width: '22%', alignItems: 'center' }]}>
                  <Text>{row.trainingProvided ? '✓' : ' '}</Text>
                </View>
                <View style={[s.cell, { width: '25%' }]}>
                  <Text>{row.other}</Text>
                </View>
              </View>
            ))}
          </>
        ) : (
          <>
            <View style={s.tableRow}>
              <View style={[s.cell, s.cellBg, { width: '8%' }]}>
                <Text style={s.bold}>#</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '45%' }]}>
                <Text style={s.bold}>Name</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '22%', textAlign: 'center' }]}>
                <Text style={s.bold}>Training Provided</Text>
              </View>
              <View style={[s.cell, s.cellBg, { width: '25%' }]}>
                <Text style={s.bold}>Other</Text>
              </View>
            </View>
            {Array.from({ length: 10 }).map((_, idx) => (
              <View key={idx} style={s.tableRow}>
                <View style={[s.cell, { width: '8%' }]}>
                  <Text>{idx + 1}</Text>
                </View>
                <View style={[s.cell, { width: '45%' }]}>
                  <Text> </Text>
                </View>
                <View style={[s.cell, { width: '22%' }]}>
                  <Text> </Text>
                </View>
                <View style={[s.cell, { width: '25%' }]}>
                  <Text> </Text>
                </View>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  )
}
