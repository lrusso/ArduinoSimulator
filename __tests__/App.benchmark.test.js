import { readdirSync, statSync } from "fs"
import path from "path"

// https://github.com/webdriverio/webdriverio/blob/ef1f58ecdd276d88b6af1d573d49a0a4585f51ba/packages/webdriverio/src/commands/browser/throttle.ts
const NETWORK_PRESETS = {
  GPRS: {
    downloadThroughput: (50 * 1024) / 8,
    latency: 500,
  },
  Regular2G: {
    downloadThroughput: (250 * 1024) / 8,
    latency: 300,
  },
  Good2G: {
    downloadThroughput: (450 * 1024) / 8,
    latency: 150,
  },
  Regular3G: {
    downloadThroughput: (750 * 1024) / 8,
    latency: 100,
  },
  Good3G: {
    downloadThroughput: (1.5 * 1024 * 1024) / 8,
    latency: 40,
  },
  Regular4G: {
    downloadThroughput: (4 * 1024 * 1024) / 8,
    latency: 20,
  },
  DSL: {
    downloadThroughput: (2 * 1024 * 1024) / 8,
    latency: 5,
  },
  WiFi: {
    downloadThroughput: (30 * 1024 * 1024) / 8,
    latency: 2,
  },
}

const getDirSize = (dirPath) => {
  try {
    let size = 0
    const files = readdirSync(dirPath)

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(dirPath, files[i])
      const stats = statSync(filePath)

      if (stats.isFile()) {
        size += stats.size
      } else if (stats.isDirectory()) {
        size += getDirSize(filePath)
      }
    }

    return size
  } catch (err) {
    throw Error("Please run 'npm run build' first.")
  }
}

const folderSize = getDirSize(path.resolve(__dirname, "../build")) / 8

const getDownloadTime = (latency, downloadSpeed) => {
  return folderSize / downloadSpeed + latency / 100
}

describe("App Benchmark", () => {
  test("GPRS testing", async () => {
    const latency = NETWORK_PRESETS.GPRS.latency
    const downloadSpeed = NETWORK_PRESETS.GPRS.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(46)
  })

  test("Regular 2G testing", async () => {
    const latency = NETWORK_PRESETS.Regular2G.latency
    const downloadSpeed = NETWORK_PRESETS.Regular2G.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(12)
  })

  test("Good 2G testing", async () => {
    const latency = NETWORK_PRESETS.Good2G.latency
    const downloadSpeed = NETWORK_PRESETS.Good2G.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(6)
  })

  test("Regular 3G testing", async () => {
    const latency = NETWORK_PRESETS.Regular3G.latency
    const downloadSpeed = NETWORK_PRESETS.Regular3G.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(4)
  })

  test("Good 3G testing", async () => {
    const latency = NETWORK_PRESETS.Good3G.latency
    const downloadSpeed = NETWORK_PRESETS.Good3G.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(2)
  })

  test("Regular 4G testing", async () => {
    const latency = NETWORK_PRESETS.Regular4G.latency
    const downloadSpeed = NETWORK_PRESETS.Regular4G.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(1)
  })

  test("DSL testing", async () => {
    const latency = NETWORK_PRESETS.DSL.latency
    const downloadSpeed = NETWORK_PRESETS.DSL.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(1.5)
  })

  test("WiFi testing", async () => {
    const latency = NETWORK_PRESETS.WiFi.latency
    const downloadSpeed = NETWORK_PRESETS.WiFi.downloadThroughput
    const downloadTime = getDownloadTime(latency, downloadSpeed)

    expect(downloadTime).toBeLessThan(1)
  })
})
