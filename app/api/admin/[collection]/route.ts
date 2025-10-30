import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI || '';

// GET all documents from a collection
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ collection: string }> }
) {
  const { collection } = await context.params;
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const documents = await db.collection(collection).find({}).toArray();

    return NextResponse.json({ documents });
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// POST new document to a collection
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ collection: string }> }
) {
  const { collection } = await context.params;
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const body = await request.json();
    const result = await db.collection(collection).insertOne(body);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(`Error creating document in ${collection}:`, error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// PUT update document in a collection
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ collection: string }> }
) {
  const { collection } = await context.params;
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const body = await request.json();
    const { _id, ...updateData } = body;

    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true, modified: result.modifiedCount });
  } catch (error) {
    console.error(`Error updating document in ${collection}:`, error);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  } finally {
    await client.close();
  }
}

// DELETE document from a collection
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ collection: string }> }
) {
  const { collection } = await context.params;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();

    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, deleted: result.deletedCount });
  } catch (error) {
    console.error(`Error deleting document from ${collection}:`, error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  } finally {
    await client.close();
  }
}
