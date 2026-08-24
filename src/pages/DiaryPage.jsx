import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import api from '../api';
import { diaryDefaultValues, diaryValidationRules } from '../form/diaryForm';
import { entryTypes, isRatedEntryType } from '../form/entryTypes';

export default function DiaryPage() {
  const [records, setRecords] = useState([]);
  const [filterType, setFilterType] = useState('');
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: diaryDefaultValues,
  });
  const selectedType = watch('recordType');

  useEffect(() => {
    loadDiaryEntries();
  }, [filterType]);

  const loadDiaryEntries = async () => {
    try {
      const res = await api.getRecords(filterType || undefined);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async ({ title, content, recordType, rating }) => {
    try {
      await api.createRecord({
        record_type: recordType,
        metadata: {
          title,
          content,
          ...(isRatedEntryType(recordType) ? { rating } : {}),
          entry_date: new Date().toISOString().split('T')[0],
        },
      });
      reset(diaryDefaultValues);
      loadDiaryEntries();
    } catch (err) {
      alert('Failed to save record');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteRecord(id);
      setRecords(records.filter((record) => record.id !== id));
    } catch (err) {
      alert('Failed to delete record');
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="w-full md:w-[calc(66.666%-1.333rem)] min-w-0 shrink-0 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-indigo-400" /> New Diary Entry
        </h3>
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <select className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white" {...register('recordType', diaryValidationRules.recordType)}>
            {entryTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
          <input type="text" placeholder="Title" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white" {...register('title', diaryValidationRules.title)} />
          {errors.title && <p className="text-sm text-red-400">{errors.title.message}</p>}
          <textarea placeholder="Content..." rows={5} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white" {...register('content', diaryValidationRules.content)} />
          {errors.content && <p className="text-sm text-red-400">{errors.content.message}</p>}
          {isRatedEntryType(selectedType) && (
            <div>
              <label htmlFor="rating" className="block text-sm text-slate-300 mb-2">Rating (1-5)</label>
              <input id="rating" type="number" min="1" max="5" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white" {...register('rating', diaryValidationRules.rating)} />
              {errors.rating && <p className="text-sm text-red-400">{errors.rating.message}</p>}
            </div>
          )}
          <button type="submit" className="w-full py-2.5 bg-indigo-600 rounded-lg text-white font-medium">Save Entry</button>
        </form>
      </div>

      <div className="min-w-0 flex-1 basis-80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-300">Journal Entries</h3>
          <select value={filterType} onChange={(event) => setFilterType(event.target.value)} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white" aria-label="Filter entries by type">
            <option value="">All types</option>
            {entryTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
        </div>
        {records.map((record) => (
          <div key={record.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl relative">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-base font-semibold text-white">{record.metadata?.title}</h4>
              <span className="text-xs text-slate-500">{entryTypes.find((type) => type.value === record.record_type)?.label || record.record_type} {record.metadata?.entry_date}</span>
            </div>
            <p className="text-sm text-slate-400 whitespace-pre-wrap">{record.metadata?.content}</p>
            {isRatedEntryType(record.record_type) && <p className="mt-3 text-sm text-amber-300">Rating: {record.metadata?.rating}/5</p>}
            <button onClick={() => handleDelete(record.id)} className="absolute bottom-4 right-4 text-slate-600 hover:text-red-400" aria-label="Delete entry">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}