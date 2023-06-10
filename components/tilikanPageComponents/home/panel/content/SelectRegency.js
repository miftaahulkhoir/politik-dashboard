import { Select, Card, Space } from "antd";
import { useState, useEffect } from "react";

export default function SelectRegency({ regencyState }) {
  const handleChange = (value) => {
    regencyState.setSelectedRegency(value);
  };

  return (
    <>
      <Card
        wrap
        style={{
          background: "white",
          minWidth: "200px",
          display: "flex",
          justifyContent: "between",
          marginBottom: "12px",
          height: "50px",
          alignItems: "center",
          border: "1px solid",
          borderColor: "#d9d9d9",
        }}
        bodyStyle={{ padding: "16px 20px" }}
      >
        <Space align="center" size={20}>
          Kabupaten di Pulau Jawa
          <Select
            showSearch
            placeholder="Pilih Kabupaten"
            block
            value={regencyState.selectedRegency}
            style={{ width: "150px" }}
            onChange={handleChange}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              { label: "Cilegon", value: "3672" },
              { label: "Kota Serang", value: "3673" },
              { label: "Kota Tangerang", value: "3671" },
              { label: "Lebak", value: "3602" },
              { label: "Pandeglang", value: "3601" },
              { label: "Serang", value: "3604" },
              { label: "Tangerang", value: "3603" },
              { label: "Tangerang Selatan", value: "3674" },
              { label: "Bantul", value: "3402" },
              { label: "Gunung Kidul", value: "3403" },
              { label: "Kota Yogyakarta", value: "3471" },
              { label: "Kulon Progo", value: "3401" },
              { label: "Sleman", value: "3404" },
              { label: "Jakarta Barat", value: "3174" },
              { label: "Jakarta Pusat", value: "3173" },
              { label: "Jakarta Selatan", value: "3171" },
              { label: "Jakarta Timur", value: "3172" },
              { label: "Jakarta Utara", value: "3175" },
              { label: "Kepulauan Seribu", value: "3101" },
              { label: "Bandung", value: "3204" },
              { label: "Bandung Barat", value: "3217" },
              { label: "Banjar", value: "3279" },
              { label: "Bekasi", value: "3216" },
              { label: "Bogor", value: "3201" },
              { label: "Ciamis", value: "3207" },
              { label: "Cianjur", value: "3203" },
              { label: "Cimahi", value: "3277" },
              { label: "Cirebon", value: "3209" },
              { label: "Depok", value: "3276" },
              { label: "Garut", value: "3205" },
              { label: "Indramayu", value: "3212" },
              { label: "Karawang", value: "3215" },
              { label: "Kota Bandung", value: "3273" },
              { label: "Kota Bekasi", value: "3275" },
              { label: "Kota Bogor", value: "3271" },
              { label: "Kota Cirebon", value: "3274" },
              { label: "Kota Sukabumi", value: "3272" },
              { label: "Kota Tasikmalaya", value: "3278" },
              { label: "Kuningan", value: "3208" },
              { label: "Majalengka", value: "3210" },
              { label: "Purwakarta", value: "3214" },
              { label: "Subang", value: "3213" },
              { label: "Sukabumi", value: "3202" },
              { label: "Sumedang", value: "3211" },
              { label: "Tasikmalaya", value: "3206" },
              { label: "Waduk Cirata", value: "3288" },
              { label: "Banjarnegara", value: "3304" },
              { label: "Banyumas", value: "3302" },
              { label: "Batang", value: "3325" },
              { label: "Blora", value: "3316" },
              { label: "Boyolali", value: "3309" },
              { label: "Brebes", value: "3329" },
              { label: "Cilacap", value: "3301" },
              { label: "Demak", value: "3321" },
              { label: "Grobogan", value: "3315" },
              { label: "Jepara", value: "3320" },
              { label: "Karanganyar", value: "3313" },
              { label: "Kebumen", value: "3305" },
              { label: "Kendal", value: "3324" },
              { label: "Klaten", value: "3310" },
              { label: "Kota Magelang", value: "3371" },
              { label: "Kota Pekalongan", value: "3375" },
              { label: "Kota Semarang", value: "3374" },
              { label: "Kota Tegal", value: "3376" },
              { label: "Kudus", value: "3319" },
              { label: "Magelang", value: "3308" },
              { label: "Pati", value: "3318" },
              { label: "Pekalongan", value: "3326" },
              { label: "Pemalang", value: "3327" },
              { label: "Purbalingga", value: "3303" },
              { label: "Purworejo", value: "3306" },
              { label: "Rembang", value: "3317" },
              { label: "Salatiga", value: "3373" },
              { label: "Semarang", value: "3322" },
              { label: "Semarang", value: "3399" },
              { label: "Sragen", value: "3314" },
              { label: "Sukoharjo", value: "3311" },
              { label: "Surakarta", value: "3372" },
              { label: "Tegal", value: "3328" },
              { label: "Temanggung", value: "3323" },
              { label: "Waduk Kedungombo", value: "3388" },
              { label: "Wonogiri", value: "3312" },
              { label: "Wonosobo", value: "3307" },
              { label: "Bangkalan", value: "3526" },
              { label: "Banyuwangi", value: "3510" },
              { label: "Batu", value: "3579" },
              { label: "Blitar", value: "3505" },
              { label: "Bojonegoro", value: "3522" },
              { label: "Bondowoso", value: "3511" },
              { label: "Gresik", value: "3525" },
              { label: "Jember", value: "3509" },
              { label: "Jombang", value: "3517" },
              { label: "Kediri", value: "3506" },
              { label: "Kota Blitar", value: "3572" },
              { label: "Kota Kediri", value: "3571" },
              { label: "Kota Madiun", value: "3577" },
              { label: "Kota Malang", value: "3573" },
              { label: "Kota Mojokerto", value: "3576" },
              { label: "Kota Pasuruan", value: "3575" },
              { label: "Kota Probolinggo", value: "3574" },
              { label: "Lamongan", value: "3524" },
              { label: "Lumajang", value: "3508" },
              { label: "Madiun", value: "3519" },
              { label: "Magetan", value: "3520" },
              { label: "Malang", value: "3507" },
              { label: "Mojokerto", value: "3516" },
              { label: "Nganjuk", value: "3518" },
              { label: "Ngawi", value: "3521" },
              { label: "Pacitan", value: "3501" },
              { label: "Pamekasan", value: "3528" },
              { label: "Pasuruan", value: "3514" },
              { label: "Ponorogo", value: "3502" },
              { label: "Probolinggo", value: "3513" },
              { label: "Sampang", value: "3527" },
              { label: "Sidoarjo", value: "3515" },
              { label: "Situbondo", value: "3512" },
              { label: "Sumenep", value: "3529" },
              { label: "Surabaya", value: "3578" },
              { label: "Trenggalek", value: "3503" },
              { label: "Tuban", value: "3523" },
              { label: "Tulungagung", value: "3504" },
            ]}
          />
        </Space>
      </Card>
    </>
  );
}
