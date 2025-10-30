'use client';

import { useState, useEffect } from 'react';

interface Document {
  _id: string;
  [key: string]: any;
}

export default function AdminPage() {
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch collections on mount
  useEffect(() => {
    fetch('/api/admin/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data.collections))
      .catch((error) => {
        console.error('Error fetching collections:', error);
        setMessage({ type: 'error', text: 'Failed to load collections' });
      });
  }, []);

  // Fetch documents when collection selected
  useEffect(() => {
    if (selectedCollection) {
      setLoading(true);
      fetch(`/api/admin/${selectedCollection}`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments(data.documents);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching documents:', error);
          setMessage({ type: 'error', text: 'Failed to load documents' });
          setLoading(false);
        });
    }
  }, [selectedCollection]);

  const handleEdit = (doc: Document) => {
    setSelectedDocument(doc);
    setEditedData(JSON.stringify(doc, null, 2));
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!selectedDocument) return;

    try {
      const parsedData = JSON.parse(editedData);
      const response = await fetch(`/api/admin/${selectedCollection}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document updated successfully' });
        setEditMode(false);
        setSelectedDocument(null);
        // Refresh documents
        const refreshRes = await fetch(`/api/admin/${selectedCollection}`);
        const refreshData = await refreshRes.json();
        setDocuments(refreshData.documents);
      } else {
        setMessage({ type: 'error', text: 'Failed to update document' });
      }
    } catch (error) {
      console.error('Error saving document:', error);
      setMessage({ type: 'error', text: 'Invalid JSON format' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/admin/${selectedCollection}?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Document deleted successfully' });
        // Refresh documents
        const refreshRes = await fetch(`/api/admin/${selectedCollection}`);
        const refreshData = await refreshRes.json();
        setDocuments(refreshData.documents);
      } else {
        setMessage({ type: 'error', text: 'Failed to delete document' });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage({ type: 'error', text: 'Failed to delete document' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MongoDB Admin Panel</h1>
          <p className="text-gray-600">Manage your website content</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Collections sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Collections</h2>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => {
                      setSelectedCollection(collection);
                      setEditMode(false);
                      setSelectedDocument(null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedCollection === collection
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Documents list or editor */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading documents...</p>
              </div>
            ) : editMode && selectedDocument ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Edit Document</h2>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setSelectedDocument(null);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                <textarea
                  value={editedData}
                  onChange={(e) => setEditedData(e.target.value)}
                  className="w-full h-[600px] font-mono text-sm p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Edit document JSON..."
                />
              </div>
            ) : selectedCollection ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedCollection} ({documents.length} documents)
                </h2>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-mono text-xs text-gray-500 mb-2">ID: {doc._id}</div>
                          <div className="text-sm text-gray-700">
                            {doc.title && <div className="font-semibold mb-1">{doc.title}</div>}
                            {doc.slug && <div className="text-gray-500">Slug: {doc.slug}</div>}
                            {doc.globalType && <div className="text-gray-500">Type: {doc.globalType}</div>}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(doc)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No documents found in this collection
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">Select a collection to view documents</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Quick Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>Select a collection from the left sidebar to view its documents</li>
            <li>Click Edit to modify a document (JSON format)</li>
            <li>Click Delete to remove a document (cannot be undone)</li>
            <li>Changes take effect immediately on the live site</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
