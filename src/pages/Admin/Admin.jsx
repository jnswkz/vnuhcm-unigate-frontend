// src/pages/Admin.jsx

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/axios';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  LabelList
} from 'recharts';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [provinceData, setProvinceData] = useState([]);
  const [loadingProv, setLoadingProv] = useState(true);
  const [errorProv, setErrorProv] = useState(null);

  const [nguyenVongStats, setNguyenVongData] = useState(null);
  const [loadingNguyenVong, setLoadingNguyenVong] = useState(true);
  const [errorNguyenVong, setErrorNguyenVong] = useState(null);

  const [phodiemd1, setPhodiemd1] = useState(null);
  const [loadingPhodiemd1, setLoadingPhodiemd1] = useState(true);
  const [errorPhodiemd1, setErrorPhodiemd1] = useState(null);

  const [phodiemd2, setPhodiemd2] = useState(null);
  const [loadingPhodiemd2, setLoadingPhodiemd2] = useState(true);
  const [errorPhodiemd2, setErrorPhodiemd2] = useState(null);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/report-ho-so'); // Cập nhật endpoint nếu cần
        setStats(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const res = await api.get('/api/report-tinh-thanh-pho'); // endpoint khác
        setProvinceData(res.data);
      } catch (err) {
        setErrorProv(err);
      } finally {
        setLoadingProv(false);
      }
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchNguyenVong = async () => {
      try {
        const res = await api.get('/api/report-nguyen-vong'); // endpoint khác
        setNguyenVongData(res.data);
      } catch (err) {
        setErrorNguyenVong(err);
      } finally {
        setLoadingNguyenVong(false);
      }
    }
    fetchNguyenVong();
  }, []);

  useEffect(() => {
    const fetchPhodiemd1 = async () => {
      try {
        const res = await api.get('/api/report-pho-diem-dot-1'); // endpoint khác
        const rawData = res.data[0];
        const transformed = Object.entries(rawData).map(([range, value]) => ({
          range: range.replace('diem_', '').replace(/_/g, '-'), // ví dụ: diem_400_500 → 400-500
          value
        }));
        setPhodiemd1(transformed);
      } catch (err) {
        setErrorPhodiemd1(err);
      } finally {
        setLoadingPhodiemd1(false);
      }
    }
    fetchPhodiemd1();
  }, []);

  useEffect(() => {
    const fetchPhodiemd2 = async () => {
      try {
        const res = await api.get('/api/report-pho-diem-dot-2'); // endpoint khác
        const rawData = res.data[0];
        const transformed = Object.entries(rawData).map(([range, value]) => ({
          range: range.replace('diem_', '').replace(/_/g, '-'), // ví dụ: diem_400_500 → 400-500
          value
        }));
        setPhodiemd2(transformed);
      } catch (err) {
        setErrorPhodiemd2(err);
      } finally {
        setLoadingPhodiemd2(false);
      }
    }
    fetchPhodiemd2();
    console.log(phodiemd2);
  }, []);



  // Chỉ hiển thị dữ liệu đợt 1 và đợt 2
  const batchKeys = ['so_dot_1', 'so_dot_2'];
  const numberData = stats
    ? batchKeys.map(key => ({ key, value: stats.number[key] }))
    : [];
  const percentageData = stats
    ? batchKeys.map(key => ({ name: key, value: stats.percentage[key] }))
    : [];

  // Tính tổng số hồ sơ tham dự
  const totalNumber = numberData.reduce((sum, item) => sum + item.value, 0);
  
  const mid = Math.ceil(provinceData.length / 2);
  const firstHalf = provinceData.slice(0, mid);
  const secondHalf = provinceData.slice(mid);
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <div className="ml-[240px] w-full p-6">
        <h1 className="text-xl font-semibold mb-4">Dashboard Overview</h1>

        {(loading || loadingProv || loadingNguyenVong || loadingPhodiemd1 || loadingPhodiemd2) && <p>Loading data...</p>}
        {(error || errorProv || errorNguyenVong || errorPhodiemd1 || errorPhodiemd2) && <p className="text-red-500">Error loading data.</p>}

        {!loading && !loadingProv  && !loadingNguyenVong && stats && provinceData && nguyenVongStats && phodiemd1 && phodiemd2 && (
          
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Thống kê số lượng thí sinh tham dự</h2>
            {/* Bảng số liệu */}
            <div className="overflow-x-auto bg-white shadow rounded">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Đợt</th>
                    <th className="px-4 py-2">Số lượng</th>
                    <th className="px-4 py-2">Phần trăm (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {numberData.map(item => (
                    <tr key={item.key} className="border-b">
                      <td className="px-4 py-2">
                        {item.key === 'so_dot_1' ? 'Đợt 1' : 'Đợt 2'}
                      </td>
                      <td className="px-4 py-2">{item.value}</td>
                      <td className="px-4 py-2">{stats.percentage[item.key]}</td>
                    </tr>
                  ))}
                  {/* Tổng số */}
                  <tr className="border-t font-semibold">
                    <td className="px-4 py-2">Tổng</td>
                    <td className="px-4 py-2">{totalNumber}</td>
                    <td className="px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pie Chart */}
            <div className="w-full h-64 bg-white shadow rounded p-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={percentageData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name === 'so_dot_1' ? 'Đợt 1' : 'Đợt 2'}: ${(percent * 100).toFixed(2)}%`
                    }
                  >
                    {percentageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value, name) => [value, name === 'so_dot_1' ? 'Đợt 1' : 'Đợt 2']} />
                  <RechartsLegend formatter={value => (value === 'so_dot_1' ? 'Đợt 1' : 'Đợt 2')} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

            <div className="space-y-6 mb-8">
              {[firstHalf, secondHalf].map((slice, idx) => (
                <div key={idx} className="bg-white shadow rounded p-4">
                  <h2 className="text-lg font-semibold mb-4">
                  Số lượng thí sinh theo tỉnh thành
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={slice}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="tinh_thanh_pho"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={60}
                      />
                      <YAxis />
                      <RechartsTooltip />
                      <RechartsLegend />
                      <Bar dataKey="so_luong" name="Số lượng" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>

        <div className="space-y-6 mb-8">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-4">
              Số lượng nguyện vọng theo các trường thành viên
            </h2>
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={nguyenVongStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="ten_truong"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={80}
                  tickFormatter={(value) => value.replace(/, /, ',\n')}
                />
                <YAxis />
                <RechartsTooltip />
                <RechartsLegend />
                <Bar dataKey="so_luong" name="Số lượng" fill="#8884d8" />
                {/* <Bar dataKey="so_luong" name="Số lượng" fill="#82ca9d" /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Phân bố điểm đợt 1</h2>
            <ResponsiveContainer width="100%" height={800}>
              <BarChart
                data={phodiemd1}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="range"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  label={{ value: "Khoảng điểm", position: "insideBottom", offset: -5 }}
                />
                <YAxis label={{ value: "Số lượng", angle: -90, position: "insideLeft" }} />
                <RechartsTooltip />
                <RechartsLegend />
                <Bar dataKey="value" name="Số lượng" fill="#8884d8">
                <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Phân bố điểm đợt 2</h2>
            <ResponsiveContainer width="100%" height={800}>
              <BarChart
                data={phodiemd2}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="range"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  label={{ value: "Khoảng điểm", position: "insideBottom", offset: -5 }}
                />
                <YAxis label={{ value: "Số lượng", angle: -90, position: "insideLeft" }} />
                <RechartsTooltip />
                <RechartsLegend />
                <Bar dataKey="value" name="Số lượng" fill="#8884d8">
                <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>



        {/* Render các trang con */}
        <Outlet />
      </div>
    </div>
  );
}
