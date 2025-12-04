<template>
  <div class="space-y-6">
    <section>
      <!-- Titel + Beschreibung -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Dokumente verwalten
        </h2>
        <p class="text-gray-600">
          Lade deine Ausbildungsdokumente hoch und verwalte sie zentral
        </p>
      </div>

      <!-- Hauptlayout -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Linke Seite: Upload + Liste -->
        <div class="col-span-12 lg:col-span-8">
          <!-- Upload-Bereich -->
          <div
            id="upload-section"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">
                Neue Dokumente hochladen
              </h3>
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <CloudArrowUpIcon class="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div
              id="upload-area"
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <div class="flex flex-col items-center space-y-4">
                <div
                  class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <ArrowUpTrayIcon class="w-8 h-8 text-gray-400" />
                </div>

                <div>
                  <p class="text-lg font-medium text-gray-900">
                    Dateien hier ablegen oder klicken
                  </p>
                  <p class="text-sm text-gray-500">
                    PDF, DOC, DOCX, JPG, PNG bis zu 10MB
                  </p>
                </div>

                <button
                  class="inline-flex items-center px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primaryDark transition-colors"
                >
                  <PlusIcon class="w-4 h-4 mr-2" />
                  Dateien auswählen
                </button>
              </div>

              <input
                type="file"
                id="file-input"
                class="hidden"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
              />
            </div>

            <div id="upload-queue" class="mt-4 space-y-3 hidden">
              <h4 class="text-sm font-medium text-gray-900">
                Upload-Warteschlange
              </h4>
              <div class="space-y-2" id="queue-items"></div>
            </div>
          </div>

          <!-- Dokumentenliste -->
          <div
            id="documents-list"
            class="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  Meine Dokumente
                </h3>

                <div class="flex items-center space-x-3">
                  <div class="flex items-center space-x-2">
                    <label class="text-sm text-gray-600">Filter:</label>
                    <select
                      id="document-filter"
                      class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">Alle Typen</option>
                      <option value="contract">Verträge</option>
                      <option value="certificate">Zeugnisse</option>
                      <option value="report">Berichte</option>
                      <option value="medical">Atteste</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>

                  <div class="flex bg-gray-100 rounded-lg p-1">
                    <button
                      id="list-view-btn"
                      class="px-3 py-1.5 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm inline-flex items-center"
                    >
                      <ListBulletIcon class="w-4 h-4 mr-1.5" />
                      Liste
                    </button>
                    <button
                      id="grid-view-btn"
                      class="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 inline-flex items-center"
                    >
                      <Squares2X2Icon class="w-4 h-4 mr-1.5" />
                      Grid
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Listen-Ansicht -->
            <div id="list-view" class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Typ
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Größe
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Datum
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <!-- 1: Vertrag -->
                  <tr class="hover:bg-gray-50 document-row" data-type="contract">
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
                        >
                          <DocumentTextIcon class="w-4 h-4 text-red-600" />
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          Ausbildungsvertrag_2024.pdf
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                      >
                        Vertrag
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">2.4 MB</td>
                    <td class="px-6 py-4 text-sm text-gray-600">01.09.2024</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Vorschau"
                        >
                          <EyeIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Löschen"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- 2: Zeugnis -->
                  <tr
                    class="hover:bg-gray-50 document-row"
                    data-type="certificate"
                  >
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
                        >
                          <DocumentTextIcon class="w-4 h-4 text-red-600" />
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          Zwischenzeugnis_Nov2024.pdf
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full"
                      >
                        Zeugnis
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">1.8 MB</td>
                    <td class="px-6 py-4 text-sm text-gray-600">15.11.2024</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Vorschau"
                        >
                          <EyeIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Löschen"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- 3: Bericht -->
                  <tr class="hover:bg-gray-50 document-row" data-type="report">
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
                        >
                          <DocumentTextIcon class="w-4 h-4 text-blue-600" />
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          Wochenbericht_KW48.docx
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
                      >
                        Bericht
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">456 KB</td>
                    <td class="px-6 py-4 text-sm text-gray-600">02.12.2024</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Vorschau"
                        >
                          <EyeIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Löschen"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- 4: Attest -->
                  <tr class="hover:bg-gray-50 document-row" data-type="medical">
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center"
                        >
                          <PhotoIcon class="w-4 h-4 text-yellow-600" />
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          Attest_Krankheit.jpg
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full"
                      >
                        Attest
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">1.2 MB</td>
                    <td class="px-6 py-4 text-sm text-gray-600">28.11.2024</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Vorschau"
                        >
                          <EyeIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Löschen"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  <!-- 5: Sonstiges -->
                  <tr class="hover:bg-gray-50 document-row" data-type="other">
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
                        >
                          <DocumentTextIcon class="w-4 h-4 text-red-600" />
                        </div>
                        <span class="text-sm font-medium text-gray-900">
                          Projektdokumentation.pdf
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        Sonstiges
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">3.7 MB</td>
                    <td class="px-6 py-4 text-sm text-gray-600">05.12.2024</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end space-x-2">
                        <button
                          class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Vorschau"
                        >
                          <EyeIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download"
                        >
                          <ArrowDownTrayIcon class="w-5 h-5" />
                        </button>
                        <button
                          class="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Löschen"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Grid-Ansicht (noch leer) -->
            <div id="grid-view" class="p-6 hidden">
              <div class="grid grid-cols-4 gap-4">
                <!-- später Grid Cards -->
              </div>
            </div>
          </div>
        </div>

        <!-- Rechte Seite: Speicher + Aktivität -->
        <div class="col-span-12 lg:col-span-4">
          <!-- Speicherplatz -->
          <div
            id="storage-info"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Speicherplatz
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-700">Verwendet</span>
                  <span class="text-sm font-semibold text-gray-900">
                    4.4 GB von 15 GB
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="bg-primary h-2.5 rounded-full"
                    style="width: 55%"
                  ></div>
                </div>
              </div>
              <div class="text-center pt-2">
                <button
                  class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Speicher erweitern
                </button>
              </div>
            </div>
          </div>

          <!-- Letzte Aktivität -->
          <div
            id="recent-activity"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Letzte Aktivität
            </h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <ArrowUpTrayIcon class="w-4 h-4 text-green-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    Projektdokumentation.pdf hochgeladen
                  </p>
                  <p class="text-xs text-gray-500">vor 2 Stunden</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <ArrowDownTrayIcon class="w-4 h-4 text-blue-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    Zwischenzeugnis.pdf heruntergeladen
                  </p>
                  <p class="text-xs text-gray-500">vor 1 Tag</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div
                  class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
                >
                  <TrashIcon class="w-4 h-4 text-red-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    Alter_Bericht.pdf gelöscht
                  </p>
                  <p class="text-xs text-gray-500">vor 3 Tagen</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Optional: weitere Stats -->
          <!-- hier kannst du später noch Stats einbauen -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  CloudArrowUpIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  ListBulletIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'

// aktuell brauchst du hier noch keine Logik – alles ist statisch
// später kannst du hier:
// - Dokumente aus dem Backend laden
// - Filter / View-Toggle (Liste/Grid) steuern
</script>
