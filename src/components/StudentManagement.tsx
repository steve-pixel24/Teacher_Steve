import { useState, useEffect } from 'react';
import { 
  StudentProfile, 
  loadStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent, 
  generateUniqueCode,
  getLevelInfo,
  getLevelColor 
} from '../utils/xpSystem';

export default function StudentManagement() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    code: '',
  });
  const [autoGenerateCode, setAutoGenerateCode] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setStudents(loadStudents());
  }, []);

  const handleCreate = () => {
    setError('');
    
    if (!formData.firstName.trim() || !formData.surname.trim()) {
      setError('Please enter both first name and surname.');
      return;
    }

    const code = autoGenerateCode 
      ? generateUniqueCode(students)
      : formData.code.trim();

    if (!code) {
      setError('Please enter a student code or enable auto-generation.');
      return;
    }

    if (students.some(s => s.code === code)) {
      setError('A student with this code already exists.');
      return;
    }

    createStudent(formData.firstName.trim(), formData.surname.trim(), code, students);
    setStudents(loadStudents());
    setFormData({ firstName: '', surname: '', code: '' });
    setShowCreateForm(false);
    setAutoGenerateCode(true);
  };

  const handleUpdate = () => {
    if (!editingStudent) return;
    
    setError('');
    
    if (!formData.firstName.trim() || !formData.surname.trim()) {
      setError('Please enter both first name and surname.');
      return;
    }

    const updated = updateStudent(editingStudent.code, {
      firstName: formData.firstName.trim(),
      surname: formData.surname.trim(),
      name: `${formData.firstName.trim()} ${formData.surname.trim()}`,
    }, students);

    setStudents(updated);
    setEditingStudent(null);
    setFormData({ firstName: '', surname: '', code: '' });
  };

  const handleDelete = (code: string) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      const updated = deleteStudent(code, students);
      setStudents(updated);
    }
  };

  const startEdit = (student: StudentProfile) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      surname: student.surname,
      code: student.code,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
    setFormData({ firstName: '', surname: '', code: '' });
    setError('');
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>
              👑 Student Management
            </h2>
            {!showCreateForm && !editingStudent && (
              <button
                onClick={() => setShowCreateForm(true)}
                style={{
                  background: 'linear-gradient(135deg, #FF9800, #F57C00)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
                }}
              >
                + Create Student
              </button>
            )}
          </div>

          {/* Create/Edit Form */}
          {(showCreateForm || editingStudent) && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                {editingStudent ? 'Edit Student' : 'Create New Student'}
              </h3>

              <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Enter first name"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                    Surname
                  </label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    placeholder="Enter surname"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                {!editingStudent && (
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                      <input
                        type="checkbox"
                        checked={autoGenerateCode}
                        onChange={(e) => setAutoGenerateCode(e.target.checked)}
                      />
                      Auto-generate 4-digit code
                    </label>
                    {!autoGenerateCode && (
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="Enter 4-digit code"
                        maxLength={4}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid rgba(148, 163, 184, 0.3)',
                          fontSize: '14px',
                          outline: 'none',
                          fontFamily: 'monospace',
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#DC2626',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={editingStudent ? handleUpdate : handleCreate}
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {editingStudent ? 'Update Student' : 'Create Student'}
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    background: 'rgba(148, 163, 184, 0.2)',
                    color: '#64748B',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Student List */}
          {students.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#64748B',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
              <p style={{ fontSize: '16px', margin: 0 }}>
                No students yet. Click "Create Student" to add your first student!
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(148, 163, 184, 0.2)' }}>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      Name
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      Code
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      Level
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      XP
                    </th>
                    <th style={{ textAlign: 'left', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      Activities
                    </th>
                    <th style={{ textAlign: 'right', padding: '12px', fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const levelInfo = getLevelInfo(student.xp);
                    const levelColor = getLevelColor(levelInfo.level);
                    
                    return (
                      <tr 
                        key={student.code}
                        style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}
                      >
                        <td style={{ padding: '12px', fontSize: '14px' }}>
                          <div style={{ fontWeight: 600 }}>{student.name}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {student.firstName} {student.surname}
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px', fontFamily: 'monospace' }}>
                          {student.code}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            background: `${levelColor}20`,
                            color: levelColor,
                          }}>
                            Level {levelInfo.level}
                          </span>
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px' }}>
                          {student.xp} XP
                        </td>
                        <td style={{ padding: '12px', fontSize: '14px' }}>
                          {student.activitiesCompleted}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <button
                            onClick={() => startEdit(student)}
                            style={{
                              background: 'rgba(59, 130, 246, 0.1)',
                              color: '#3B82F6',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              marginRight: '8px',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.code)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#DC2626',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
